import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/api.service';
import { ProjectForm } from '../../components/project-form/project-form';
import { Project } from '../../models/project.model';

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
  this.isSubmitting.set(true); // Disable buttons/show spinner
  const id = updatedData.id;
  
  this.projectService.updateProject(id, updatedData).subscribe({
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
