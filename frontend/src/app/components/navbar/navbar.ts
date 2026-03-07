import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

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
  private toastr = inject(ToastrService);

  resumeUrl = signal(`${environment.apiUrl}/api/resume/download`);

  //Handles logout
  onLogout() {
    this.auth.logout();
    this.toastr.success('Connection Terminated Safely', 'LOGOUT SUCCESS', {
    });
    this.router.navigate(['/home']);
  }
}