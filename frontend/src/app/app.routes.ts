// frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';

// --- Components ---
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Welcome } from './welcome/welcome';
import { ForgotPassword } from './auth/forgot-password/forgot-password';
import { AboutUs } from './about-us/about-us';

import { Dashboard } from './dashboard/dashboard';
import { VolunteerDashboard } from './dashboard/volunteer-dashboard/volunteer-dashboard';
import { NgoDashboard } from './dashboard/ngo-dashboard/ngo-dashboard';

import { OpportunityList } from './opportunities/opportunity-list/opportunity-list';
import { CreateOpportunity } from './opportunities/create-opportunity/create-opportunity';

import { NgoProfile } from './dashboard/ngo-dashboard/ngo-profile/ngo-profile';
import { VolunteerProfile } from './dashboard/volunteer-dashboard/volunteer-profile/volunteer-profile';
import { NgoList } from './dashboard/volunteer-dashboard/ngo-list/ngo-list';
import { MyApplications } from './dashboard/volunteer-dashboard/my-applications/my-applications';
import { Certificate } from './certificate/certificate';

// --- THESE ARE THE MISSING COMPONENTS ---
import { ManageApplications } from './dashboard/ngo-dashboard/manage-applications/manage-applications';
import { NgoFeedback } from './dashboard/ngo-dashboard/ngo-feedback/ngo-feedback';

export const routes: Routes = [
  // --- Public Routes ---
  { path: '', component: AboutUs }, 
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'about', component: AboutUs },

  // --- Protected Routes ---
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  
  // Volunteer Routes
  { path: 'volunteer-portal', component: VolunteerDashboard, canActivate: [AuthGuard] },
  { path: 'volunteer-profile', component: VolunteerProfile, canActivate: [AuthGuard] },
  { path: 'my-applications', component: MyApplications, canActivate: [AuthGuard] },
  { path: 'ngo-directory', component: NgoList, canActivate: [AuthGuard] },
  { path: 'certificate/:id', component: Certificate, canActivate: [AuthGuard] },
  
  // NGO Routes
  { path: 'ngo-portal', component: NgoDashboard, canActivate: [AuthGuard] },
  { path: 'create-opportunity', component: CreateOpportunity, canActivate: [AuthGuard] },
  { path: 'ngo-profile', component: NgoProfile, canActivate: [AuthGuard] },
  
  // --- THESE ARE THE MISSING ROUTES ---
  { 
    path: 'manage-applications', 
    component: ManageApplications, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'ngo-reviews', 
    component: NgoFeedback, 
    canActivate: [AuthGuard] 
  },

  // Shared Routes
  { path: 'opportunities', component: OpportunityList, canActivate: [AuthGuard] },
];