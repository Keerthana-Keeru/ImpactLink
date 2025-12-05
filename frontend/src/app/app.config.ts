// frontend/src/app/app.config.ts

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// --- 1. IMPORT withInterceptors ---
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 

// --- 2. IMPORT the Interceptor function ---
import { authInterceptor } from './auth/auth-interceptor'; // Check this path!
import { ForgotPassword } from './auth/forgot-password/forgot-password';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    
    // --- 3. UPDATE provideHttpClient to USE the interceptor ---
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])) 
  ]
};