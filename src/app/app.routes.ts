import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './update/update.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { RestaurantregisterComponent } from './restaurantregister/restaurantregister.component';
import { RestaurantloginComponent } from './restaurantlogin/restaurantlogin.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { HomeComponent } from './home/home.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { authGuard } from './auth.guard';
import { restaurantAuthGuardGuard } from './restaurant-auth-guard.guard';


export const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'register', component: RegisterComponent },

     { path: 'login', component: LoginComponent },
   
     { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
     { path: 'update', component: UpdateComponent,canActivate: [authGuard]},


    { path: 'order', component: OrderComponent ,canActivate: [authGuard]},
    
   
     { path: 'payment/:orderId', component: PaymentComponent },
   
    { path: 'order-tracking/:orderId', component: OrderTrackingComponent,canActivate: [authGuard]},
    { path: 'Restaurantregister', component: RestaurantregisterComponent },
    { path: 'Restaurantlogin', component: RestaurantloginComponent },
    { path: 'restaurant-profile', component: RestaurantProfileComponent, canActivate: [restaurantAuthGuardGuard] },
    { path: 'payment-success', component: PaymentSuccessComponent },
    { path: 'payment-cancel', component: PaymentCancelComponent },
  { path: 'previousorders', component: PreviousOrdersComponent,canActivate: [authGuard] },
  { path: 'restaurant-orders', component: RestaurantOrdersComponent }, 

   
    { path: '', redirectTo: '/register', pathMatch: 'full' }
];
