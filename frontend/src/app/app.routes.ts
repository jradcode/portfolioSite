import { Routes } from '@angular/router';
import { home } from './pages/home/home';
import { about } from './pages/about/about';
import { resume } from './pages/resume/resume';
import { details } from './pages/details/details';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: home },
  { path: 'about', component: about },
  { path: 'resume', component: resume },
  { path: 'project/:id', component: details },
  { path: '**', redirectTo: 'home' } // Wildcard route for 404s  
];
