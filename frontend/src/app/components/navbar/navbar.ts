import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class navbar {

  auth = inject(AuthService);
  private router = inject(Router);

  resumeUrl = signal('assets/docs/WebDevResume.pdf');

  //Handles logout
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}