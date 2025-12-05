import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Import RouterLink
import { OpportunityList } from '../../opportunities/opportunity-list/opportunity-list';

@Component({
  selector: 'app-volunteer-dashboard',
  standalone: true,
  imports: [
    OpportunityList,
    RouterLink // 2. Add to imports
  ],
  templateUrl: './volunteer-dashboard.html',
  styleUrl: './volunteer-dashboard.css'
})
export class VolunteerDashboard {}