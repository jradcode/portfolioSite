import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { header } from './components/header/header';
import { navbar } from './components/navbar/navbar';
import { ProjectService } from '../services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, header, navbar],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  // Inject the service
  private projectService = inject(ProjectService);
  
  title = signal("Jarrad's Portfolio");

  ngOnInit() {
    // Start the data stream (Mock or C#) as soon as the app loads
    this.projectService.loadProjects().subscribe();
  }
}