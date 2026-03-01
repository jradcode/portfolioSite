import { Routes } from '@angular/router';
import { home } from './pages/home/home';
import { about } from './pages/about/about';
import { resume } from './pages/resume/resume';
import { details } from './pages/details/details';
import { AddProject } from './pages/add-project/add-project';
import { EditProject } from './pages/edit-project/edit-project';
import { Login } from './components/login/login';
// 1. Import your guard here
import { authGuard } from '../guards/auth-guard'; 

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: home },
  { path: 'about', component: about },
  { path: 'resume', component: resume },
  { path: 'project/:id', component: details },
  
  // 2. Attach the guard to the protected admin routes
  { 
    path: 'add-project', 
    component: AddProject, 
    canActivate: [authGuard] 
  },
  { 
    path: 'edit-project/:id', 
    component: EditProject, 
    canActivate: [authGuard] 
  },

  { path: '**', redirectTo: 'home' } 
];