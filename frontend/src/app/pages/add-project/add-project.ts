import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/api.service';
import { ProjectForm } from '../../components/project-form/project-form';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ProjectForm],
  templateUrl: './add-project.html',
  styleUrl: './add-project.scss',
})
export class AddProject {
  private projectService = inject(ProjectService);
  private router = inject(Router);

  /**
   * Called by (submitted)="createProject($event)" in HTML
   */
  createProject(newProject: Project) {
    this.projectService.createProject(newProject).subscribe({
      next: (response) => {
        console.log('Project successfully injected into system:', response);
        // Navigate back to the gallery
        this.router.navigate(['/projects']); 
      },
      error: (err) => {
        console.error('System transmission failed:', err);
      }
    });
  }

  /**
   * Called by (cancelled)="goBack()" in HTML
   */
  goBack() {
    this.router.navigate(['/projects']);
  }
}