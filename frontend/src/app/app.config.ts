import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../interceptors/auth-interceptor';
import { loadingInterceptor } from '../interceptors/loading-interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enables the high-performance "Zoneless" mode
    provideZonelessChangeDetection(), 
    
    // Standard Routing
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),

    // Modern HTTP client (optimized for 2026 browsers)
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, loadingInterceptor]))
  ]
};