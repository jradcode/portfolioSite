import { Component, input, computed, AfterViewInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../../services/api.service';
import { NgOptimizedImage } from '@angular/common';
import { environment } from '../../../environments/environment';
import { first } from 'rxjs';

// Materialize Global Variable
declare var M: any;

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class details implements AfterViewInit {
  private projectService = inject(ProjectService);
  
  // Bound from URL via provideRouter withComponentInputBinding()
  id = input.required<string>(); 

  project = signal<Project | undefined>(undefined);

  //Process images: Remains a computed, but now reacts to 'project' signal
  fullImageUrls = computed(() => {
    const proj = this.project();
    
    if (!proj || !proj.images) {
      return ['assets/placeholder.png'];
    }

    let imageArray: string[] = [];

    try {
      imageArray = typeof proj.images === 'string' 
        ? JSON.parse(proj.images) 
        : proj.images;
    } catch (e) {
      imageArray = [proj.images as unknown as string];
    }

    if (imageArray.length === 0) return ['assets/placeholder.png'];

    return imageArray.map(path => {
      if (path.startsWith('data:image') || path.startsWith('http')) {
        return path;
      }
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `${environment.serverUrl}${cleanPath}`;
    });
  });

  constructor() {
    // This effect watches the ID input. When the ID changes (or the page loads),
    // it fetches the FULL project details (including narrative) from the API.
    effect(() => {
      const numericId = Number(this.id());
      if (numericId) {
        this.projectService.fetchProjectById(numericId)
          .pipe(first()) // Automatically unsubs after one emission
          .subscribe({
            next: (fullProject) => {
              console.log('Full Project Loaded with Narrative:', fullProject);
              this.project.set(fullProject);
            },
            error: (err) => {
              console.error('Error fetching project details:', err);
              this.project.set(undefined);
            }
          });
      }
    });

    // Re-initialize Materialize zoom effects
    effect(() => {
      if (this.project()) {
        requestAnimationFrame(() => this.initMaterialbox());
      }
    });
  }

  ngAfterViewInit() {
    this.initMaterialbox();
  }

  private initMaterialbox() {
    const elems = document.querySelectorAll('.materialboxed');
    if (typeof M !== 'undefined' && elems.length > 0) {
      M.Materialbox.init(elems, {
        inDuration: 300,
        outDuration: 200
      });
    }
  }
}