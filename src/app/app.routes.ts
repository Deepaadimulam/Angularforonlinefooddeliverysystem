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

export const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'register', component: RegisterComponent },

     { path: 'login', component: LoginComponent },
   
     { path: 'profile', component: ProfileComponent },
     { path: 'update', component: UpdateComponent },


    { path: 'order', component: OrderComponent },
    
   
     { path: 'payment/:orderId', component: PaymentComponent },
   
    { path: 'order-tracking/:orderId', component: OrderTrackingComponent },
    { path: 'Restaurantregister', component: RestaurantregisterComponent },
    { path: 'Restaurantlogin', component: RestaurantloginComponent },
    { path: 'restaurant-profile', component: RestaurantProfileComponent },
    { path: 'payment-success', component: PaymentSuccessComponent },
    { path: 'payment-cancel', component: PaymentCancelComponent },
  { path: 'previousorders', component: PreviousOrdersComponent },
  { path: 'restaurant-orders', component: RestaurantOrdersComponent }, 

   
    { path: '', redirectTo: '/register', pathMatch: 'full' }
];
