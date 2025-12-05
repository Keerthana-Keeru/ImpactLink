// frontend/src/app/auth/login/login.ts

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule for styles

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule // Add this
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  public email!: string;
  public password!: string;
  
  // 1. New variable to track the selected tab (default to volunteer)
  public selectedRole: string = 'volunteer'; 
  
  // 2. Variable for error messages
  public errorMessage: string = '';

  private apiUrl = 'http://localhost:5000/api/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // 3. Function to switch tabs
  selectRole(role: string) {
    this.selectedRole = role;
    this.errorMessage = ''; // Clear errors when switching
  }

  onSubmit() {
    const formData = {
      email: this.email,
      password: this.password
    };

    console.log(`Attempting to log in as ${this.selectedRole}:`, formData);

    this.http.post(this.apiUrl, formData).subscribe({
      next: (response: any) => {
        
        // --- 4. SMART CHECK: Does the account match the selected button? ---
        const actualRole = response.user.role; // The role from the database

        if (actualRole !== this.selectedRole) {
          // If mismatch, stop them!
          this.errorMessage = `Error: This account is registered as an ${actualRole.toUpperCase()}. Please switch to the ${actualRole} tab.`;
          return; // Stop execution
        }

        // If roles match, proceed with login
        console.log('Login successful!', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_role', response.user.role);
        
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}