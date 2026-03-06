import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { header } from './components/header/header';
import { navbar } from './components/navbar/navbar';
import { Spinner } from './components/spinner/spinner';
import { ProjectService } from '../services/api.service';
import { environment } from '../environments/environment';
import { DeleteModal } from './components/delete-modal/delete-modal'; 
import { DeleteModalService } from '../services/delete-modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, header, navbar, Spinner, DeleteModal],
  templateUrl: './app.component.html',
  //styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // Inject the service to manage global project data
  private projectService = inject(ProjectService);
  protected modalService = inject(DeleteModalService);
  
  title = signal("Jarrad's Portfolio");

  ngOnInit() {
    // do the HTTP request to the C# Backend (via Proxy)
    // subscribe here so the data loads as soon as the user hits the site
    this.projectService.loadProjects().subscribe({
      next: (data) => {
        console.log('App component: Data stream initialized successfully.');
      },
      error: (err) => {
        console.error('App component: Initial data load failed!', err);
      }
    });
  }
}