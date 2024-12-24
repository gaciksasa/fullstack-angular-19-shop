import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow-sm mb-6">
        <nav class="container mx-auto px-4 py-4">
          <h1 class="text-2xl font-bold text-gray-800">Shop App</h1>
        </nav>
      </header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'angular19-shop';
}