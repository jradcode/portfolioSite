import { Component, input, output, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project, ProjectNarrative } from '../../models/project.model'; //model is split into two interfaces

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

  project = signal<Project>(this.getEmptyProject());
  
  // Track drag state for UI styling
  isDragging = signal(false);

  constructor() {
    effect(() => {
      const data = this.initialData();
      this.project.set(data ? JSON.parse(JSON.stringify(data)) : this.getEmptyProject());
    });
  }

  // --- Image Handling Logic ---

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
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64String = e.target.result;
          // Append new image to the existing array
          this.project.update(p => ({
            ...p,
            images: [...p.images, base64String]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(index: number) {
    this.project.update(p => ({
      ...p,
      images: p.images.filter((_, i) => i !== index)
    }));
  }

  // --- Existing Helper Methods ---

  updateField(field: keyof Project, value: any) {
    this.project.update(p => ({ ...p, [field]: value }));
  }

  updateNarrative(field: keyof ProjectNarrative, value: string) {
  this.project.update(p => ({
    ...p,
    narrative: {
      // Default values if narrative was null
      ...(p.narrative || { id: 0, backStory: '', designPhilosophy: '', technicalChallenges: '' }),
      [field]: value
    }
  }));
}

  updateTech(value: string) {
    const techArray = value.split(',').map(t => t.trim()).filter(t => t !== '');
    this.updateField('technologies', techArray);
  }

onSubmit() {
  const currentProject = this.project();
  const isEdit = !!this.initialData();

  // Explicitly typing the payload as Project
  const payload: Project = {
    ...currentProject,
    id: isEdit ? currentProject.id : 0,
    narrative: currentProject.narrative 
      ? {
          ...currentProject.narrative,
          // Shared PK logic: Narrative ID must match Project ID
          id: isEdit ? currentProject.id : 0 
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
    technologies: [],
    narrative: { 
      id: 0, // Add this
      backStory: '', 
      designPhilosophy: '', 
      technicalChallenges: '' 
    }
  };
}
}