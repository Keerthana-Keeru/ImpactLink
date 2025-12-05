// frontend/src/app/opportunities/create-opportunity/create-opportunity.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. Import FormsModule
import { CommonModule } from '@angular/common'; // 2. Import CommonModule

@Component({
  selector: 'app-create-opportunity',
  standalone: true,
  imports: [
    FormsModule,   // 3. Add FormsModule
    CommonModule   // 4. Add CommonModule
  ],
  templateUrl: './create-opportunity.html',
  styleUrl: './create-opportunity.css'
})
export class CreateOpportunity {

  // 5. Add variables for our form fields
  public title!: string;
  public description!: string;
  public date!: Date;
  public location!: string;

  // 6. Define the new backend API endpoint
  private apiUrl = 'http://localhost:5000/api/opportunities';

  // 7. Inject HttpClient and Router
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // 8. Create the onSubmit function
  onSubmit() {
    const opportunityData = {
      title: this.title,
      description: this.description,
      date: this.date,
      location: this.location
      // The 'organizer' (the logged-in NGO) will be added by our backend
    };

    console.log('Attempting to create opportunity:', opportunityData);

    // Send the POST request. The interceptor will automatically add our token!
    this.http.post(this.apiUrl, opportunityData).subscribe({
      
      next: (response) => {
        console.log('Opportunity created successfully!', response);
        // On success, redirect to the main opportunities list
        this.router.navigate(['/opportunities']);
      },
      
      error: (err) => {
        console.error('Failed to create opportunity:', err);
        // We'll add user-facing errors later
      }
    });
  }
}