import { Routes } from '@angular/router';
import { home } from './pages/home/home';
import { about } from './pages/about/about';
import { resume } from './pages/resume/resume';
import { details } from './pages/details/details';
import { AddProject } from './pages/add-project/add-project';
import { EditProject } from './pages/edit-project/edit-project';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: home },
  { path: 'about', component: about },
  { path: 'resume', component: resume },
  { path: 'project/:id', component: details },
  
  // Straightforward paths for your new work
  { path: 'add-project', component: AddProject },
  { path: 'edit-project/:id', component: EditProject },

  { path: '**', redirectTo: 'home' } 
];