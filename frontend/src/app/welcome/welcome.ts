// frontend/src/app/welcome/welcome.ts

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- 1. IMPORT THIS

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    RouterLink // <-- 2. ADD THIS TO THE IMPORTS ARRAY
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {

}