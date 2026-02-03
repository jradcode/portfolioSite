import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { header } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, header],
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = signal("Jarrad's Portfolio");
}