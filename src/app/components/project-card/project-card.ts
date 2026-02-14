import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Ensure this is here!
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink], // And here!
  templateUrl: './project-card.html',
})
export class projectCard {
  project = input.required<Project>();
  currentImgIndex = signal(0);

  nextImage(event: MouseEvent) {
    const images = this.project().images;
    this.currentImgIndex.update(idx => (idx + 1) % images.length);
  }

  prevImage(event: MouseEvent) {
    const images = this.project().images;
    this.currentImgIndex.update(idx => (idx - 1 + images.length) % images.length);
  }
}