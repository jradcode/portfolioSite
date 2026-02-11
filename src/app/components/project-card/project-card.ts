import { Component, input, signal } from '@angular/core';
import { Project } from '../../models/project.model'; // Adjust path if needed
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [], // We'll add CommonModule here if you use old pipes, but @for doesn't need it!
  templateUrl: './project-card.html',
})
export class projectCard {
  // Use the new Signal Input pattern
  project = input.required<Project>();
  
  // Track carousel state locally in the card
  currentImgIndex = signal(0);

  nextImage(event: Event) {
    event.stopPropagation(); // Prevents clicking the arrow from clicking the card
    const total = this.project().images.length;
    this.currentImgIndex.update(idx => (idx + 1) % total);
  }

  prevImage(event: Event) {
    event.stopPropagation();
    const total = this.project().images.length;
    this.currentImgIndex.update(idx => (idx - 1 + total) % total);
  }
}
