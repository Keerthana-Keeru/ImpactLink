// frontend/src/app/app.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- 1. MUST IMPORT THIS
import { Navbar } from './navbar/navbar';      // <-- 2. MUST IMPORT THIS

@Component({
  selector: 'app-root',
  standalone: true,
  
  // --- 3. BOTH MUST BE IN THE IMPORTS ARRAY ---
  imports: [
    RouterOutlet, 
    Navbar
  ],
  
  // --- 4. BOTH TAGS MUST BE IN THE TEMPLATE ---
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App {
  // Your title property can stay if you have one
}