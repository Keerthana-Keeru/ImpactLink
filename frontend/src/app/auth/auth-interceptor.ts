// frontend/src/app/auth/auth-interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const platformId = inject(PLATFORM_ID);
  
  // 1. Only run this code in the browser
  if (isPlatformBrowser(platformId)) {
    
    // 2. Get the token
    const token = localStorage.getItem('token');

    // 3. If the token exists, clone the request and add the header
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // This matches your new middleware!
        }
      });
      return next(cloned);
    }
  }

  // If no token or on the server, send the original request
  return next(req);
};