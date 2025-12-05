import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ngo-dashboard',
  standalone: true,
  imports: [RouterLink], // NO OpportunityList here!
  templateUrl: './ngo-dashboard.html',
  styleUrl: './ngo-dashboard.css'
})
export class NgoDashboard {}