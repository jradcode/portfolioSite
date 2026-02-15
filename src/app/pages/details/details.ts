import { Component, input, computed, AfterViewInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { MOCK_PROJECTS } from '../../data/mock-projects';
import { NgOptimizedImage } from '@angular/common';

declare var M: any;

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class details implements AfterViewInit {
  // Automatically bound from the URL /project/:id
  id = input.required<string>(); 

  // Reactively find the project
  project = computed(() => {
    const numericId = Number(this.id());
    return MOCK_PROJECTS.find(p => p.id === numericId);
  });

  constructor() {
    // This will run every time the project changes!
    effect(() => {
      if (this.project()) {
        // Wait for the DOM to update with the new project images
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