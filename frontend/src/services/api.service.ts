import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Master config
import { Project } from '../app/models/project.model';
//import { MOCK_PROJECTS } from '../app/data/mock-projects';
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

// --- ADDED FOR THE CREATE/EDIT PAGES ---

  // POST: Create a new project
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project).pipe(
      tap(newProj => {
        // Optimistic UI update: add the new project to the signal list
        this.projects.update(current => [...current, newProj]);
      })
    );
  }

  // PUT: Update an existing project
  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project).pipe(
      tap(updatedFromServer => {
        this.projects.update(current => 
          current.map(p => p.id === id ? updatedFromServer : p)
        );
      })
    );
  }
  getProjectById(id: number): Project | undefined {
    return this.projects().find(p => p.id === id);
  }

  // 1. The Instant Signal Look-up (Keep this)

// 2. The Deep-Link API Fetch (Add this)
fetchProjectById(id: number): Observable<Project> {
  return this.http.get<Project>(`${this.apiUrl}/${id}`).pipe(
    tap(project => {
      // Bonus: If the project isn't in our signal list yet, add/update it!
      this.projects.update(current => {
        const exists = current.find(p => p.id === project.id);
        return exists ? current.map(p => p.id === project.id ? project : p) : [...current, project];
      });
    })
  );
}
  // DELETE: Remove a project from the system
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        // Update the signal to remove the project locally
        this.projects.update(current => current.filter(p => p.id !== id));
        console.log(`Project ${id} successfully deleted`);
      }),
      catchError(err => {
        console.error('Delete failed. Check API connection:', err);
        throw err;
      })
    );
  }
}

//return this.http.post('https://localhost:7143/api/auth/login', credentials); auth for future?