import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Enables the high-performance "Zoneless" mode
    provideZonelessChangeDetection(), 
    
    // 2. Standard Routing
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),

    // 3. Modern HTTP client (optimized for 2026 browsers)
    provideHttpClient(withFetch())
  ]
};