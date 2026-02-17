import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Master config
import { Project } from '../app/models/project.model';
import { MOCK_PROJECTS } from '../app/data/mock-projects';
import { Observable, of, tap, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  
  // This will match your [Route("api/projects")] in C#
  private apiUrl = `${environment.apiUrl}/projects`;

  projects = signal<Project[]>([]);
  loading = signal<boolean>(false);

  loadProjects(): Observable<Project[]> {
    this.loading.set(true);

    // If useMockData is true, we stay local. If false, we hit the C# API.
    const request$ = environment.useMockData 
      ? of(MOCK_PROJECTS) 
      : this.http.get<Project[]>(this.apiUrl);

    return request$.pipe(
      tap(data => {
        this.projects.set(data);
        this.loading.set(false);
      }),
      catchError(err => {
        console.error('Connection failed. Falling back to mocks.', err);
        this.projects.set(MOCK_PROJECTS);
        this.loading.set(false);
        return of(MOCK_PROJECTS);
      })
    );
  }

  getProjectById(id: number): Project | undefined {
    return this.projects().find(p => p.id === id);
  }
}