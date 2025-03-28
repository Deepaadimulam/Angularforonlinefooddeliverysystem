import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const restaurantAuthGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const storedRestaurant = localStorage.getItem('restaurant');
  const isRestaurantLoggedIn = !!storedRestaurant;

  if (!isRestaurantLoggedIn) {
    
    router.navigate(['/Restaurantlogin']);
    return false;
  }


  return true;
};