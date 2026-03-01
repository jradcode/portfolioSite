import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // You are the admin, pass through!
  } else {
    // Not logged in? Redirect to login page
    router.navigate(['/login']);
    return false;
  }
};
