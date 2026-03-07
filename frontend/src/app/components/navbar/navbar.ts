import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  private http = inject(HttpClient);

  resumeUrl = signal(`${environment.apiUrl}/resume/download`);

  //Download logic
  downloadResume() {
  // Add a timestamp to the URL: .../download?t=17123456789
  const cacheBusterUrl = `${this.resumeUrl()}?t=${new Date().getTime()}`;

  this.http.get(cacheBusterUrl, { responseType: 'blob' }).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Jarrad-Web-Dev-Resume.pdf'; 
      link.click();
      window.URL.revokeObjectURL(url);
      this.toastr.success('RESUME DOWNLOADED!');
    },
    error: () => this.toastr.error('Could not find the resume on server.')
  });
}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.uploadResume(file);
    } else {
      this.toastr.warning('Please select a valid PDF.');
    }
  }

  private uploadResume(file: File) {
    const formData = new FormData();
    formData.append('file', file); // 'file' matches the C# IFormFile parameter name

    // Manual header if no interceptor exists
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);

    this.http.post(`${environment.apiUrl}/resume/upload`, formData, { headers }).subscribe({
      next: () => this.toastr.success('Resume updated on server!', 'UPLOAD SUCCESS'),
      error: (err) => {
        console.error(err);
        this.toastr.error('Upload failed. Check Admin permissions.');
      }
    });
  }

  //Handles logout
  onLogout() {
    this.auth.logout();
    this.toastr.success('Connection Terminated Safely', 'LOGOUT SUCCESS', {
    });
    this.router.navigate(['/home']);
  }
}