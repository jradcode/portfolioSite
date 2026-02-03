import { Component, signal } from '@angular/core';

// check out Calendly You share a link, and people can book a 15-minute slot on your calendar. You get their info first, and no one gets your number until you're ready.
//check out google voice that forwards my phone and can change my number to avoid telemarketers
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class header {
  appName = signal('Jarrad\'s Portfolio Site');
  name = signal('Jarrad Lovelace');
  email = signal('jlovelace2500k@gmail.com');
  linkedin = signal('https://www.linkedin.com/in/jarrad-lovelace-b07085115/ ');
  position = signal('Full Stack Engineer');
}
