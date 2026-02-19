import { Component, signal, inject } from '@angular/core';
//import { MOCK_PROJECTS } from '../../data/mock-projects';
import { ProjectService } from '../../../services/api.service';
import { Project } from '../../models/project.model';
//import { RouterLink } from '@angular/router';
import { projectCard } from '../../components/project-card/project-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ projectCard ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class home {
  // Using a Signal
  //using the api.service instead of the mock data
  public projectService = inject(ProjectService);
}