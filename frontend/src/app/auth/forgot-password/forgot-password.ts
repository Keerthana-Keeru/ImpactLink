import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  public email: string = '';
  public newPassword: string = '';
  public message: string = '';
  public isError: boolean = false;

  private apiUrl = 'http://localhost:5000/api/auth/reset-password';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const data = { email: this.email, newPassword: this.newPassword };

    this.http.post(this.apiUrl, data).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.isError = false;
        // Wait 2 seconds then go to login
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isError = true;
        this.message = err.error.message || 'Failed to reset password.';
      }
    });
  }
}