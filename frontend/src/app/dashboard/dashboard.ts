// frontend/src/app/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth'; // 1. Import your Auth service

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: '<p>Loading...</p>', // 2. The user will only see this for a millisecond
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit { // 3. Implement OnInit

  // 4. Inject Auth and Router
  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  // 5. This function runs the MOMENT the dashboard loads
  ngOnInit(): void {
    if (this.auth.isNgo()) {
      // If user is an NGO, send them to the NGO portal
      this.router.navigate(['/ngo-portal']);
      
    } else if (this.auth.isVolunteer()) {
      // If user is a Volunteer, send them to the Volunteer portal
      this.router.navigate(['/volunteer-portal']);
      
    } else {
      // If role is missing (e.g., error), log them out
      console.error('No role found, logging out.');
      this.auth.logout();
    }
  }
}