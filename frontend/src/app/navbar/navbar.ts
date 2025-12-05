// frontend/src/app/navbar/navbar.ts

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- 1. IMPORT THIS

import { Auth } from '../auth/auth'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule // <-- 2. ADD THIS
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(public auth: Auth) {} 

  onLogout(): void {
    this.auth.logout();
  }
}