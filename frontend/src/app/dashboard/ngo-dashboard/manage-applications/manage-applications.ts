import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-applications.html',
  styleUrl: './manage-applications.css'
})
export class ManageApplications implements OnInit {

  public applications: any[] = [];
  public isLoading = true;
  
  private apiUrl = 'http://localhost:5000/api/applications';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchApplications();
  }

  fetchApplications() {
    // Call the new route we just made
    this.http.get(`${this.apiUrl}/ngo-applications`).subscribe({
      next: (data: any) => {
        this.applications = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  // Function to Accept or Reject
  updateStatus(appId: string, newStatus: string) {
    if(!confirm(`Are you sure you want to mark this as ${newStatus}?`)) return;

    const url = `${this.apiUrl}/${appId}/update-status`;
    
    this.http.patch(url, { status: newStatus }).subscribe({
      next: () => {
        alert(`Volunteer ${newStatus}!`);
        this.fetchApplications(); // Refresh list to show new status
      },
      error: (err) => alert('Error updating status')
    });
  }
}