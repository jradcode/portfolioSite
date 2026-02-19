import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { header } from './components/header/header';
import { navbar } from './components/navbar/navbar';
import { ProjectService } from '../services/api.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, header, navbar],
  templateUrl: './app.component.html',
  //styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // 1. Inject the service to manage global project data
  private projectService = inject(ProjectService);
  
  title = signal("Jarrad's Portfolio");

  ngOnInit() {
    // 2. Debug logs to confirm environment settings
    console.log('--- Environment Check ---');
    console.log('Production Mode:', environment.production);
    console.log('Mock Data Active:', environment.useMockData);
    console.log('API Endpoint:', environment.apiUrl);

    // 3. Kick off the HTTP request to the C# Backend (via Proxy)
    // We subscribe here so the data loads as soon as the user hits the site
    this.projectService.loadProjects().subscribe({
      next: (data) => {
        console.log('✅ AppComponent: Data stream initialized successfully.');
      },
      error: (err) => {
        console.error('❌ AppComponent: Initial data load failed!', err);
      }
    });
  }
}