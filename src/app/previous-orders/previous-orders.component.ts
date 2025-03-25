import { Component, OnInit } from '@angular/core';

import { OrderService } from '../Service/order.service';
import { AuthService } from '../Service/auth.service';
import { Order } from '../model/Order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../Service/restaurant.service';
import { Restaurant } from '../model/Restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previous-orders',
  imports: [CommonModule,FormsModule],
  templateUrl: './previous-orders.component.html',
  styleUrl: './previous-orders.component.css'
})
export class PreviousOrdersComponent  implements OnInit {

  previousOrders: Order[] = [];
 
  restaurantNames: { [key: number]: string } = {}; // Store restaurant names by restaurantID

  constructor(
    private orderService: OrderService,
    private router:Router,
    private authService: AuthService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.loadPreviousOrders();
  }

  loadPreviousOrders(): void {
    const customer = this.authService.getCustomer();
    if (customer && customer.customerID) {
      this.orderService.getOrdersByCustomerID(customer.customerID).subscribe(
        orders => {
          this.previousOrders = orders;
          this.loadRestaurantDetails();
        },
        error => console.error('Error fetching previous orders', error)
      );
    }
  }

  loadRestaurantDetails(): void {
    this.previousOrders.forEach(order => {
      this.restaurantService.getRestaurantById(order.restaurantID).subscribe(
        restaurant => {
          this.restaurantNames[order.restaurantID] = restaurant.name; // Store restaurant name by restaurantID
        },
        error => console.error('Error fetching restaurant details', error)
      );
    });
  }

  trackOrder(orderID: number): void {
    this.router.navigate(['/order-tracking', orderID]);
  }
}