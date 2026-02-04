import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { header } from './components/header/header';
import { navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, header, navbar],
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = signal("Jarrad's Portfolio");
}