// frontend/src/app/about-us/about-us.ts

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Enables the links
import { CommonModule } from '@angular/common'; // 2. Enables *ngIf

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink, CommonModule], // 3. Add them here
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {
  // 4. Variable to control if About Us is visible
  public showAboutSection: boolean = false;

  // 5. Function to toggle the section
  toggleAbout() {
    this.showAboutSection = !this.showAboutSection;
    
    // Scroll to the section if opening
    if (this.showAboutSection) {
      setTimeout(() => {
        document.getElementById('about-content')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}