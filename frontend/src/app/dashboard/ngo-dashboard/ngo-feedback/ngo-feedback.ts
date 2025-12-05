import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngo-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngo-feedback.html',
  styleUrl: './ngo-feedback.css'
})
export class NgoFeedback implements OnInit {
  public reviews: any[] = [];
  public isLoading = true;
  private apiUrl = 'http://localhost:5000/api/feedback/my-reviews';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => {
        this.reviews = data;
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
}