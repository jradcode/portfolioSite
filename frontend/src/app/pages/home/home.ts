import { Component, signal, inject } from '@angular/core';
//import { MOCK_PROJECTS } from '../../data/mock-projects'; //for testing
import { ProjectService } from '../../../services/api.service';
//import { Project } from '../../models/project.model'; //for testing
import { SpinnerService } from '../../../services/spinner.service';
import { projectCard } from '../../components/project-card/project-card';
import { ProjectSkeleton } from '../../components/project-skeleton/project-skeleton';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ProjectSkeleton, projectCard ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class home {
  // Using a Signal
  //using the api.service instead of the mock data
  public projectService = inject(ProjectService);
  public spinnerService = inject(SpinnerService);
 
}