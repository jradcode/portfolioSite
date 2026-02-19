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

  // NO MORE TOGGLES. NO MORE MOCKS.
  // We hit the API. If it fails, the console will stay RED until we fix the connection.
  return this.http.get<Project[]>(this.apiUrl).pipe(
    tap(data => {
      console.log('API RESPONSE RECEIVED:', data);
      this.projects.set(data);
      this.loading.set(false);
    }),
    catchError(err => {
      console.error('API IS BROKEN. FIX THE CONNECTION:', err);
      this.loading.set(false);
      // We return an empty array instead of mocks so the UI stays empty 
      // until the API is actually fixed.
      return of([]); 
    })
  );
}

  getProjectById(id: number): Project | undefined {
    return this.projects().find(p => p.id === id);
  }
}