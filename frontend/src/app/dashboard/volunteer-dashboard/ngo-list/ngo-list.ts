import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For Search Bar
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // For Video Security

@Component({
  selector: 'app-ngo-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule
  templateUrl: './ngo-list.html',
  styleUrl: './ngo-list.css'
})
export class NgoList implements OnInit {
  
  public allNgos: any[] = []; // Stores ALL data
  public filteredNgos: any[] = []; // Stores what we see (after search)
  public searchTerm: string = '';
  
  private apiUrl = 'http://localhost:5000/api/ngo/all';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer // Inject Sanitizer
  ) {}

  ngOnInit() {
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => {
        this.allNgos = data;
        this.filteredNgos = data; // Show all initially
      },
      error: (err) => console.error('Error fetching NGOs:', err)
    });
  }

  // 1. Search Filter Function
  filterNgos() {
    if (!this.searchTerm) {
      this.filteredNgos = this.allNgos;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredNgos = this.allNgos.filter(ngo => 
        ngo.organizationName.toLowerCase().includes(term) || 
        ngo.missionStatement.toLowerCase().includes(term)
      );
    }
  }

  // 2. Video Embed Converter
  // Turns "youtube.com/watch?v=ID" into "youtube.com/embed/ID"
  getSafeVideoUrl(url: string): SafeResourceUrl | null {
    if (!url) return null;

    let videoId = '';
    
    // Extract ID from standard URL
    if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } 
    // Handle short links (youtu.be/ID)
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    }

    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      // Tell Angular this URL is safe to run in an iframe
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return null;
  }
}