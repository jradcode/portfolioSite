import { Component, input, computed, AfterViewInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../../services/api.service';
import { NgOptimizedImage } from '@angular/common';
import { environment } from '../../../environments/environment';

// Materialize Global Variable
//details page
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
  
  // Bound automatically from the URL /project/:id via provideRouter(routes, withComponentInputBinding())
  id = input.required<string>(); 

  // 1. Find the project in the shared service signal
  project = computed(() => {
    const numericId = Number(this.id());
    return this.projectService.projects().find(p => p.id === numericId);
  });

  // 2. Process images: Handle JSON strings, Base64, and Server URLs
  fullImageUrls = computed(() => {
    const proj = this.project();
    
    // Safety check: No project or no images
    if (!proj || !proj.images) {
      return ['assets/placeholder.png'];
    }

    let imageArray: string[] = [];

    // Step A: Parse if stringified JSON, otherwise use as is
    try {
      imageArray = typeof proj.images === 'string' 
        ? JSON.parse(proj.images) 
        : proj.images;
    } catch (e) {
      // If parsing fails, it might be a single raw string
      imageArray = [proj.images as unknown as string];
    }

    if (imageArray.length === 0) return ['assets/placeholder.png'];

    // Step B: Transform paths into full valid URLs
    return imageArray.map(path => {
      // Return immediately if it's Base64 or an external absolute URL
      if (path.startsWith('data:image') || path.startsWith('http')) {
        return path;
      }
      
      // Fix potential missing slash and append server URL
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `${environment.serverUrl}${cleanPath}`;
    });
  });

  constructor() {
    // Re-initialize Materialize zoom effects whenever the project data changes
    effect(() => {
      if (this.project()) {
        // requestAnimationFrame ensures the DOM has rendered the new @for loop
        requestAnimationFrame(() => this.initMaterialbox());
      }
    });
  }

  ngAfterViewInit() {
    this.initMaterialbox();
  }

  // Materialize CSS "Materialbox" (Lightbox) initialization
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