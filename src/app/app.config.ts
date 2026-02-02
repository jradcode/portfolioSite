import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Enables the high-performance "Zoneless" mode
    provideZonelessChangeDetection(), 
    
    // 2. Standard Routing
    provideRouter(routes),

    // 3. Modern HTTP client (optimized for 2026 browsers)
    provideHttpClient(withFetch())
  ]
};