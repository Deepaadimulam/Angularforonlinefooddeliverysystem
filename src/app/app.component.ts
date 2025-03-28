import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { PaymentComponent } from './payment/payment.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { RestaurantloginComponent } from './restaurantlogin/restaurantlogin.component';
import { RestaurantregisterComponent } from './restaurantregister/restaurantregister.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { authGuard } from './auth.guard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RegisterComponent,LoginComponent,UpdateComponent,ProfileComponent,OrderComponent,OrderTrackingComponent,PaymentComponent,RestaurantProfileComponent,RestaurantloginComponent,RestaurantregisterComponent,PreviousOrdersComponent,RestaurantOrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'onlinefooddeliverymanagement';
}
