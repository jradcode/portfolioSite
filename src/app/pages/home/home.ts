import { Component, signal } from '@angular/core';
import { MOCK_PROJECTS } from '../../data/mock-projects';
import { Project } from '../../models/project.model';
import { projectCard } from '../../components/project-card/project-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [projectCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class home {
  // Using a Signal to store your projects
  projects = signal<Project[]>(MOCK_PROJECTS);
}