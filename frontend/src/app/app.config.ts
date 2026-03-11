import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions, withHashLocation } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../interceptors/auth-interceptor';
import { loadingInterceptor } from '../interceptors/loading-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorInterceptor } from '../interceptors/error-interceptor';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enables the high-performance "Zoneless" mode
    provideZonelessChangeDetection(), 
    
    // Standard Routing
    provideRouter(routes, withHashLocation(), withComponentInputBinding(), withViewTransitions()),

    // Modern HTTP client (optimized for 2026 browsers)
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, loadingInterceptor, errorInterceptor])),
    provideAnimationsAsync(),
    
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      easeTime: 500,
      newestOnTop: true,
      preventDuplicates: true,
      progressBar: true
    }),
  ]
};