import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Ensure this is here!
import { Project } from '../../models/project.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage], // And here!
  templateUrl: './project-card.html',
})
export class projectCard {
  project = input.required<Project>();
  currentImgIndex = signal(0);

  setImgIndex(index: number) {
    this.currentImgIndex.set(index);
  }
  preloadNext() {
    const images = this.project().images;
    if (!images || images.length <= 1) return;
    
    // Preload the image at the next index
    const nextIdx = (this.currentImgIndex() + 1) % images.length;
    const img = new Image();
    img.src = images[nextIdx];
  }

  nextImage(event: MouseEvent) {
    const total = this.project().images?.length ?? 0;
    if (total > 0) {
      this.currentImgIndex.update(idx => (idx + 1) % total);
      // Trigger preload so the NEXT next image is ready
      this.preloadNext(); 
    }
  }

  prevImage(event: MouseEvent) {
    const total = this.project().images?.length ?? 0;
    if (total > 0) {
      this.currentImgIndex.update(idx => (idx - 1 + total) % total);
    }
  }
}