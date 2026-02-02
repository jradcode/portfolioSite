import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      <h1 class="text-4xl font-bold mb-4">{{ title() }}</h1>
      
      <p class="mb-6">
        Status: 
        <span class="bg-[--color-brand] text-white px-3 py-1 rounded shadow-sm text-sm">
          Zoneless v21.1
        </span>
      </p>
      
      <button 
        (click)="updateTitle()" 
        class="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all active:scale-95 shadow-md">
        Refresh Title
      </button>
      
      <div class="mt-8 w-full max-w-4xl">
        <router-outlet />
      </div>
    </div>
  `
})
export class AppComponent {
  title = signal('Jarrad\'s Portfolio');

  updateTitle() {
    this.title.set('Work in Progress...');
  }
}