import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './Service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = !!authService.getCustomer(); 

  if (!isLoggedIn) {
  
    router.navigate(['/login']);
    return false;
  }

  
  return true;
};