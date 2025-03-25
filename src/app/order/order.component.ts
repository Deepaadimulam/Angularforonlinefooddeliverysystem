import { Component, OnInit } from '@angular/core';

import { MenuService } from '../Service/menu.service';
import { OrderService } from '../Service/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { RestaurantService } from '../Service/restaurant.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent  implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  selectedRestaurant: any = null;
  menuItems: any[] = [];
  selectedItems: any[] = [];
  customer: any;
  checkoutView: boolean = false;
  totalAmount: number = 0;
  searchQuery: string = '';

  constructor(
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
    this.customer = this.authService.getCustomer(); 
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurants = data;
        this.filteredRestaurants = data;
      },
      error => console.error('Error fetching restaurants', error)
    );
  }

  searchRestaurants(): void {
    if (this.searchQuery) {
      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredRestaurants = this.restaurants;
    }
  }

  onRestaurantSelect(restaurantId: number): void {
    this.selectedRestaurant = restaurantId;
    this.menuService.getMenuByRestaurantID(restaurantId).subscribe(
      data => this.menuItems = data,
      error => console.error('Error fetching menu items', error)
    );
  }

  goBack(): void {
    this.selectedRestaurant = null;
    this.menuItems = [];
  }

  goBackToMenu(): void {
    this.checkoutView = false;
  }

  addToCart(item: any): void {
    const existingItem = this.selectedItems.find(i => i.itemID === item.itemID);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.selectedItems.push({ ...item, quantity: 1 });
    }
    this.calculateTotalAmount();
    item.added = true;
    setTimeout(() => item.added = false, 1000); // Show +1 indication for 1 second
  }

  removeFromCart(item: any): void {
    this.selectedItems = this.selectedItems.filter(i => i.itemID !== item.itemID);
    this.calculateTotalAmount();
  }

  increaseQuantity(item: any): void {
    item.quantity += 1;
    this.calculateTotalAmount();
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeFromCart(item);
    }
    this.calculateTotalAmount();
  }

  showCheckout(): void {
    this.checkoutView = true;
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  confirmOrder(): void {
    if (this.customer && this.customer.customerID) {
      const menuItems = this.selectedItems.map(item => ({ itemID: item.itemID, quantity: item.quantity, price: item.price }));
      this.orderService.placeOrder(this.customer.customerID, menuItems).subscribe(
        response => {
          alert('Order placed in Pending status, orderID=' + response.orderID +"  status= "+response.status+'  please proceed with payment to confirm your order');
          this.router.navigate(['/payment', response.orderID]);
        },
        error => alert('Error placing order: ' + error.message)
      );
    } else {
      console.error('No customer ID found');
    }
  }
}