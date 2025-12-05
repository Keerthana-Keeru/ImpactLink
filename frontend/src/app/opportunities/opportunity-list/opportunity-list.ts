import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- Critical for the form

@Component({
  selector: 'app-opportunity-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // <--- Ensure FormsModule is here
  templateUrl: './opportunity-list.html',
  styleUrl: './opportunity-list.css'
})
export class OpportunityList implements OnInit {
  public opportunities: any[] = [];
  public isLoading: boolean = true;
  private apiUrl = 'http://localhost:5000/api/opportunities';
  private appUrl = 'http://localhost:5000/api/applications';

  // --- MODAL VARIABLES ---
  public showModal: boolean = false;
  public selectedEvent: any = null;
  public motivation: string = '';
  public experience: string = '';
  public applicantName: string = '';
  public applicantPhone: string = '';
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.fetchOpportunities(); }

  fetchOpportunities() {
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => {
        this.opportunities = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => { this.isLoading = false; this.cdr.markForCheck(); }
    });
  }

  // 1. OPEN THE POPUP
  openApplyForm(op: any) {
    this.selectedEvent = op;
    this.showModal = true;
    this.motivation = ''; // Reset form
    this.experience = '';
    this.applicantName = ''; // Reset
    this.applicantPhone = ''; // Reset
  }

  // 2. CLOSE THE POPUP
  closeModal() {
    this.showModal = false;
    this.selectedEvent = null;
  }

  // 3. SEND THE DATA (Fixes the "Motivation Required" error)
  submitApplication() {
    if (!this.applicantName || !this.applicantPhone || !this.motivation) {
      alert("Please fill in all required fields (Name, Phone, Motivation).");
      return;
    }

    const url = `${this.appUrl}/${this.selectedEvent._id}`;
    
    // This is the data the backend was missing!
    const body = {
      motivation: this.motivation,
      experience: this.experience,
      applicantName: this.applicantName, // <--- Send it
      applicantPhone: this.applicantPhone // <--- Send i
    };
    
    this.http.post(url, body).subscribe({
      next: () => {
        alert('Application Sent Successfully!');
        this.closeModal();
      },
      error: (err) => {
        if (err.status === 400) alert('You have already applied for this event.');
        else alert('Error: ' + err.message);
      }
    });
  }
}