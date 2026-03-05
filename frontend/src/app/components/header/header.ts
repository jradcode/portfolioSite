import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
//Displays the data in header
export class header {
  appName = signal('Jarrad\'s Portfolio Site');
  name = signal('Jarrad Lovelace');
  email = signal('jlovelace2500k@gmail.com');
  linkedin = signal('https://www.linkedin.com/in/jarrad-lovelace-b07085115/ ');
  position = signal('Full Stack Engineer');
}
