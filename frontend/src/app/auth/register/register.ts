// frontend/src/app/auth/register/register.ts

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // 1. Import CommonModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule // 2. Add CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  public username!: string;
  public email!: string;
  public password!: string;
  
  // 3. Add variable to track selected role
  public selectedRole: string = 'volunteer'; 

  private apiUrl = 'http://localhost:5000/api/auth/register';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // 4. Function to switch tabs
  selectRole(role: string) {
    this.selectedRole = role;
  }

  onSubmit() {
    // 5. Add the 'role' to the data we send
    const formData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.selectedRole // <-- This is the new, important part
    };

    console.log('Attempting to register new user:', formData);

    this.http.post(this.apiUrl, formData).subscribe({
      next: (response) => {
        console.log('Registration successful!', response);
        // On success, send them to the login page
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        // You can add an error message here later
      }
    });
  }
}