import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/api.service';
import { ProjectForm } from '../../components/project-form/project-form';
import { Project } from '../../models/project.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ProjectForm],
  templateUrl: './edit-project.html',
  styleUrl: './edit-project.scss',
})
export class EditProject implements OnInit {
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // This signal holds the project we are editing
  projectToEdit = signal<Project | null>(null);

  projectWithFullUrls = computed(() => {
    const p = this.projectToEdit();
    if (!p) return null;

    // Create a deep copy so we don't accidentally mutate the original signal
    return {
      ...p,
      images: p.images.map(img => 
        img.startsWith('data:image') || img.startsWith('http') 
          ? img 
          : `${environment.serverUrl}${img}`
      )
    };
  });

  ngOnInit() {
    // 1. Get the ID from the URL (e.g., /projects/edit/5)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (id) {
      // 2. Find the project in our service signal
      const project = this.projectService.getProjectById(id);
      
      if (project) {
        this.projectToEdit.set(project);
      } else {
        // 3. Fallback: If page refreshed, reload projects from API
        this.projectService.loadProjects().subscribe(() => {
           this.projectToEdit.set(this.projectService.getProjectById(id) || null);
        });
      }
    }
  }

  // Matches (submitted)="updateProject($event)"
 isSubmitting = signal(false);

updateProject(updatedData: Project) {
  this.isSubmitting.set(true);
  
  // 1. Strip the serverUrl back off so we only save relative paths (e.g., /images/...)
  const cleanedImages = updatedData.images.map(img => 
    img.split(environment.serverUrl).join('')
  );

  // 2. Prepare the final object for the API
  const finalPayload = { 
    ...updatedData, 
    images: cleanedImages 
  };

  // 3. Send the CLEANED data to the service
  this.projectService.updateProject(finalPayload.id, finalPayload).subscribe({
    next: () => {
      this.isSubmitting.set(false);
      this.router.navigate(['/projects']);
    },
    error: (err) => {
      this.isSubmitting.set(false);
      console.error('Update failed:', err);
    }
  });
}

  // Matches (cancelled)="goBack()"
  goBack() {
    this.router.navigate(['/projects']);
  }
}
