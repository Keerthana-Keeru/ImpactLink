// frontend/src/app/auth/auth.ts

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_role'); // Make sure this is here
      this.router.navigate(['/login']);
    }
  }

  // --- THESE ARE THE FUNCTIONS THE ERROR IS ABOUT ---
  getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user_role');
    }
    return null;
  }

  isNgo(): boolean {
    return this.getRole() === 'ngo';
  }

  isVolunteer(): boolean {
    return this.getRole() === 'volunteer';
  }
}