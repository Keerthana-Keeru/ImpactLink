import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-volunteer-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './volunteer-profile.html',
  styleUrl: './volunteer-profile.css'
})
export class VolunteerProfile implements OnInit {
 
  // Variables for the form
  public profilePic:string='';
  public firstName: string = '';
  public lastName: string = '';
  public phoneNumber: string = '';
  public address: string = '';
  public skills: string = '';
  public interests: string = '';
  public availability: string = '';

  private apiUrl = 'http://localhost:5000/api/volunteer/profile';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchProfile();
  }

  // 1. Get existing data so the form isn't empty
  fetchProfile() {
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => {
        console.log('Profile loaded:', data);
        this.profilePic=data.profilePic|| 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.phoneNumber = data.phoneNumber || '';
        this.address = data.address || '';
        this.skills = data.skills ? data.skills.join(', ') : ''; // Array to String
        this.interests = data.interests || '';
        this.availability = data.availability || '';
      },
      error: (err) => {
        console.log('No existing profile found (this is normal for new users)');
      }
    });
  }

  // 2. Save the data
  onSubmit() {
    const profileData = {
      profilePic:this.profilePic,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      address: this.address,
      skills: this.skills, // Backend handles string-to-array conversion
      interests: this.interests,
      availability: this.availability
       // Send image URL
    };

    this.http.post(this.apiUrl, profileData).subscribe({
      next: (res) => {
        alert('Profile Updated Successfully!');
        this.router.navigate(['/volunteer-portal']);
      },
      error: (err) => {
        console.error('Error saving profile:', err);
        alert('Failed to save profile.');
      }
    });
  }
}