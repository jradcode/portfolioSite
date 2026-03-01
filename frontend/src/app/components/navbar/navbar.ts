import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../services/auth'; // Verify this path matches your src/services folder

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class navbar {
  // 1. Inject the services
  auth = inject(AuthService);
  private router = inject(Router);

  resumeUrl = signal('assets/docs/WebDevResume.pdf');

  // 2. Add the logout logic
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}