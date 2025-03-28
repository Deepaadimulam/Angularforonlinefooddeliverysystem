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
 
   
 
   const restaurantData = localStorage.getItem('restaurant');
 
   if (!restaurantData) {
 
   
 
    this.router.navigate(['/restaurant-login']);
 
    return;
 
   }
 
 
 
   this.restaurant = JSON.parse(restaurantData);
 
 
 

 
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
 
 
 
  
 
  goToProfile(): void {
 
   this.router.navigate(['/restaurant-profile']);
 
  }
 
 }