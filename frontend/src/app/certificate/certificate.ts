import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate.html',
  styleUrl: './certificate.css'
})
export class Certificate implements OnInit {
  public app: any = null;
  public date = new Date();
  public isLoading = true;
  public errorMessage = '';
  
  // Variable for the QR Image URL
  public qrCodeUrl: string = '';

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Get the Application ID from the URL
    const appId = this.route.snapshot.paramMap.get('id');
    
    if(appId) {
      this.fetchCertificateData(appId);
    } else {
      this.errorMessage = "No Certificate ID provided.";
      this.isLoading = false;
    }
  }

  fetchCertificateData(id: string) {
    // We reuse the my-applications endpoint to find the specific completed event
    this.http.get('http://localhost:5000/api/applications/my-applications').subscribe({
      next: (data: any) => {
        // Find the specific application matching the ID
        this.app = data.find((a: any) => a._id === id);
        
        if (!this.app) {
          this.errorMessage = "Certificate not found. (Ensure the event is marked as completed)";
        } else {
          // --- GENERATE QR DATA ---
          // Prioritize the name from the form, fallback to username, then email
          const name = this.app.applicantName || this.app.volunteer?.username || 'Volunteer';
          const event = this.app.opportunity?.title;
          const org = this.app.opportunity?.created_by?.username;
          const verifyId = this.app._id;

          // The text that will appear when scanned
          const qrData = `VERIFIED CERTIFICATE\nName: ${name}\nEvent: ${event}\nOrg: ${org}\nID: ${verifyId}`;
          
          // Generate the image URL using a free public API
          this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
        }

        this.isLoading = false;
        this.cdr.markForCheck(); // Force screen update
      },
      error: (err) => {
        console.error("Certificate Error:", err);
        this.errorMessage = "Failed to load certificate data.";
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  printCertificate() {
    window.print();
  }
}