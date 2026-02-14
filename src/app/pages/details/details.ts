import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { MOCK_PROJECTS } from '../../data/mock-projects';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class details {
  // 1. Get the ID from the URL (e.g., /project/2)
  id = input.required<string>(); 

  // 2. Reactively find the project whenever the ID changes
  project = computed(() => {
    const numericId = Number(this.id());
    return MOCK_PROJECTS.find(p => p.id === numericId);
  });
}