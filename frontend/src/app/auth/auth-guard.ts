// frontend/src/app/auth/auth-guard.ts

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { Auth } from './auth'; 

// The name of the exported function should be AuthGuard
export const AuthGuard: CanActivateFn = (route, state) => {
  
  const auth = inject(Auth);
  const router = inject(Router);
  
  if (auth.isLoggedIn()) {
    return true; 
  } else {
    router.navigate(['/login']);
    return false;
  }
};