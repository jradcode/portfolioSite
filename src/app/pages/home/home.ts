import { Component, signal } from '@angular/core';
import { MOCK_PROJECTS } from '../src/app/data/mock-projects';
import { Project } from '../src/app/models/project.model';

@Component({
  selector: 'app-home',
  template: `
    <div class="project-grid">
      @for (item of projects(); track item.id) {
        <app-project-card [project]="item" />
      }
    </div>
  `
})
export class HomeComponent {
  // Using a Signal to store your projects
  projects = signal<Project[]>(MOCK_PROJECTS);
}