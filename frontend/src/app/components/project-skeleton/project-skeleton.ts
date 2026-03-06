import { Component } from '@angular/core';

@Component({
  selector: 'app-project-skeleton',
  standalone: true,
  templateUrl: './project-skeleton.html',
  styles: [`
    :host {
      display: block;
      transition: opacity 0.5s ease-in-out;
    }
  `]
})
export class ProjectSkeleton {

}
