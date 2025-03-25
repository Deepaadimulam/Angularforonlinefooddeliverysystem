import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../Service/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant-orders',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './restaurant-orders.component.html',
  styleUrl: './restaurant-orders.component.css'
})
export class RestaurantOrdersComponent implements OnInit {



  restaurant: any;
 
  restaurantOrders: any[] = [];
 
  statuses = ['Preparing', 'Completed'];
 
 
 
  constructor(
 
   private route: ActivatedRoute,
 
   private router: Router,
 
   private orderService: OrderService
 
  ) {}
 
 
 
  ngOnInit(): void {
 
   // 1) Retrieve the restaurant info from localStorage
 
   const restaurantData = localStorage.getItem('restaurant');
 
   if (!restaurantData) {
 
    // If not found, redirect to login
 
    this.router.navigate(['/restaurant-login']);
 
    return;
 
   }
 
 
 
   this.restaurant = JSON.parse(restaurantData);
 
 
 
   // 2) Fetch orders for this restaurant
 
   this.loadOrdersForRestaurant();
 
  }
 
 
 
  loadOrdersForRestaurant(): void {
 
   this.orderService.getOrdersByRestaurantID(this.restaurant.restaurantID)
 
    .subscribe({
 
     next: (orders) => {
 
      this.restaurantOrders = orders;
 
     },
 
     error: (err) => {
 
      console.error('Failed to load restaurant orders:', err);
 
     }
 
    });
 
  }
 
 
 
  updateOrderStatus(orderID: number, newStatus: string) {
 
   this.orderService.updateOrderStatus(orderID, newStatus)
 
    .subscribe({
 
     next: (updatedOrder) => {
 
      // Find the order in restaurantOrders and update its status
 
      const index = this.restaurantOrders.findIndex(o => o.orderID === updatedOrder.orderID);
 
      if (index !== -1) {
 
       this.restaurantOrders[index].status = updatedOrder.status;
 
      }
 
      console.log('Order status updated:', updatedOrder);
 
     },
 
     error: (err) => {
 
      console.error('Error updating order status:', err);
 
     }
 
    });
 
  }
 
 
 
  // Optional: navigate back to restaurant profile
 
  goToProfile(): void {
 
   this.router.navigate(['/restaurant-profile']);
 
  }
 
 }