import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Add FormsModule

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css'
})
export class MyApplications implements OnInit {
  public applications: any[] = [];
  public isLoading: boolean = true;
  private apiUrl = 'http://localhost:5000/api/applications/my-applications';
  private feedbackUrl = 'http://localhost:5000/api/feedback';

  // Modal Variables
  public showFeedbackModal: boolean = false;
  public selectedApp: any = null;
  public rating: number = 0;
  public message: string = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => { this.applications = data; this.isLoading = false; this.cdr.markForCheck(); },
      error: () => { this.isLoading = false; this.cdr.markForCheck(); }
    });
  }

  isEventCompleted(dateString: string): boolean {
    return new Date() > new Date(dateString);
  }

  // Open Modal
  openFeedbackForm(app: any) {
    this.selectedApp = app;
    this.showFeedbackModal = true;
    this.rating = 0;
    this.message = '';
  }

  setRating(star: number) { this.rating = star; }

  closeFeedbackModal() { this.showFeedbackModal = false; }

  submitFeedback() {
    if (this.rating === 0) { alert("Please select a star rating."); return; }
    if (!this.message) { alert("Please write a short comment."); return; }

    const feedbackData = {
      ngoId: this.selectedApp.opportunity.created_by,
      opportunityId: this.selectedApp.opportunity._id,
      rating: this.rating,
      message: this.message
    };

    this.http.post(this.feedbackUrl, feedbackData).subscribe({
      next: () => {
        alert("Feedback Sent! Thank you.");
        this.closeFeedbackModal();
      },
      error: (err) => {
        // Backend handles duplicates now
        alert("Error: You may have already rated this event."); 
      }
    });
  }
}