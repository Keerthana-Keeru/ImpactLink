// frontend/src/app/dashboard/ngo-dashboard/ngo-profile/ngo-profile.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngo-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ngo-profile.html',
  styleUrl: './ngo-profile.css'
})
export class NgoProfile {

  // Form variables
  public organizationName: string = '';
  public missionStatement: string = '';
  public address: string = '';
  public website: string = '';
  public contactPhone: string = '';
  public youtubeLink: string = '';

  private apiUrl = 'http://localhost:5000/api/ngo/profile';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    const profileData = {
      organizationName: this.organizationName,
      missionStatement: this.missionStatement,
      address: this.address,
      website: this.website,
      contactPhone: this.contactPhone,
      youtubeLink: this.youtubeLink
    };

    console.log('Saving NGO Profile:', profileData);

    // Send to backend (Interceptor handles the token!)
    this.http.post(this.apiUrl, profileData).subscribe({
      next: (response) => {
        console.log('Profile saved successfully!', response);
        alert('Profile saved!');
        // Redirect back to the main NGO dashboard
        this.router.navigate(['/ngo-portal']);
      },
      error: (err) => {
        console.error('Error saving profile:', err);
        alert('Failed to save profile. Please try again.');
      }
    });
  }
}