import { Component, input, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { NgOptimizedImage } from '@angular/common';
import { ProjectService } from '../../../services/api.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './project-card.html',
})
export class projectCard {
  project = input.required<Project>();
  currentImgIndex = signal(0);
  private projectService = inject(ProjectService);
  public authService = inject(AuthService);

  // Add this inside your projectCard class
  setImgIndex(index: number) {
    // Update the signal with the specific index passed from the HTML
    this.currentImgIndex.set(index);
  }

  // 1. Centralized logic to handle the JSON string vs Array issue
  imageList = computed(() => {
    const raw = this.project().images;
    if (!raw) return [];
    try {
      // If it's a string that looks like ["img.jpg"], parse it. 
      // Otherwise, wrap the single string in an array.
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      return [raw];
    }
  });

  // 2. Uses the imageList to figure out exactly what to show
  displayImageUrl = computed(() => {
    const images = this.imageList();
    if (images.length === 0) return 'assets/placeholder.png';

    const path = images[this.currentImgIndex()];

    // Base64 or External URL check
    if (path.startsWith('data:image') || path.startsWith('http')) {
      return path;
    }

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${environment.serverUrl}${cleanPath}`;
  });

  deleteProject(id: number) {
    if (confirm('CAUTION: Will delete project permanently. Proceed?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => console.log('UI updated via service signal.'),
        error: (err) => alert('Purge sequence failed: ' + err.message)
      });
    }
  }

  nextImage(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation(); // Prevents the card's RouterLink from triggering
    const total = this.imageList().length;
    if (total > 1) {
      this.currentImgIndex.update(idx => (idx + 1) % total);
      this.preloadNext();
    }
  }

  prevImage(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const total = this.imageList().length;
    if (total > 1) {
      this.currentImgIndex.update(idx => (idx - 1 + total) % total);
    }
  }

  preloadNext() {
    const images = this.imageList();
    if (images.length <= 1) return;

    const nextIdx = (this.currentImgIndex() + 1) % images.length;
    const path = images[nextIdx];
    
    // Don't need to preload Base64 strings
    if (path.startsWith('data:image')) return;

    const img = new Image();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    img.src = path.startsWith('http') ? path : `${environment.serverUrl}${cleanPath}`;
  }
}