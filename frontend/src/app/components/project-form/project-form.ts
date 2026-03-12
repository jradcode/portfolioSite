import { Component, input, output, signal, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project, ProjectNarrative } from '../../models/project.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './project-form.html'
})
export class ProjectForm {
  initialData = input<Project | null>(null);
  submitted = output<Project>();
  cancelled = output<void>();
  private toastr = inject(ToastrService);

  project = signal<Project>(this.getEmptyProject());
  
  // State Signals
  isDragging = signal(false);
  isLoading = signal(false); 
  techString = signal<string>('');

  constructor() {
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.project.set(JSON.parse(JSON.stringify(data)));
        this.techString.set(data.technologies.join(', '));
      } else {
        this.project.set(this.getEmptyProject());
        this.techString.set('');
      }
    }, { allowSignalWrites: true }); 
  }

  // --- Image Handling ---

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    const files = event.dataTransfer?.files;
    if (files) this.processFiles(files);
  }

  onDragLeave(event: DragEvent) {
    this.isDragging.set(false);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) this.processFiles(files);
  }

 private processFiles(files: FileList) {
    const validImages = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (validImages.length > 0) {
      this.toastr.info(`Uploading ${validImages.length} image...`, 'IMAGE ADDED');
    }

    validImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result;
        this.project.update(p => ({
          ...p,
          images: [...p.images, base64String]
        }));
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.project.update(p => ({
      ...p,
      images: p.images.filter((_, i) => i !== index)
    }));
  }

  // --- Data Binding Helpers ---

  updateField(field: keyof Project, value: any) {
    this.project.update(p => ({ ...p, [field]: value }));
  }

  updateNarrative(field: keyof ProjectNarrative, value: string) {
    this.project.update(p => ({
      ...p,
      narrative: {
        ...(p.narrative || { id: 0, backStory: '', designPhilosophy: '', technicalChallenges: '' }),
        [field]: value
      }
    }));
  }

  updateTech(value: string) {
    this.techString.set(value);
    const techArray = value.split(',').map(t => t.trim()).filter(t => t !== '');
    this.project.update(p => ({ ...p, technologies: techArray }));
  }

  // --- Submit Logic ---

  onSubmit() {
    if (this.isLoading()) return;

    if (!this.project().name || !this.project().description) {
      this.toastr.warning('Please fill in the project name and description.', 'SUBMIT FAILED!');
      return;
    }
    this.isLoading.set(true);

    const currentProject = this.project();
    const isEdit = !!this.initialData();

    const payload: Project = {
      ...currentProject,
      id: isEdit ? (currentProject.id ?? 0) : 0,
      narrative: currentProject.narrative 
        ? {
            ...currentProject.narrative,
            id: isEdit ? (currentProject.id ?? 0) : 0 
          } 
        : null
    };

    this.submitted.emit(payload);
  }

  private getEmptyProject(): Project {
    return {
      id: 0, 
      name: '', 
      description: '', 
      images: [], 
      githubUrl: '', 
      isPrivate: false,
      technologies: [],
      narrative: { 
        id: 0, 
        backStory: '', 
        designPhilosophy: '', 
        technicalChallenges: '' 
      }
    };
  }
}