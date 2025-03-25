import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../Service/customer-service.service';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../model/Customer';
import { RestaurantService } from '../Service/restaurant.service';
import { Restaurant } from '../model/Restaurant';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  customer: Customer | null = null;
 
  showSidebar: boolean = false;
 
  constructor(
 
   private customerService: CustomerServiceService,
 
   public authService: AuthService,
 
   private router: Router
 
  ) {}
 
  ngOnInit(): void {
 
   this.loadCustomerProfile();
 
  }
 
  loadCustomerProfile(): void {
 
   this.customer = this.authService.getCustomer();
 
   console.log('Retrieved customer:', this.customer);
 
   if (this.customer && this.customer.customerID) {
 
    this.customerService.getCustomerById(this.customer.customerID).subscribe(
 
     data => {
 
      this.customer = data;
 
      this.showSidebar = true;
 
     },
 
     error => console.error('Error fetching customer profile', error)
 
    );
 
   } else {
 
    console.error('No customer ID found');
 
   }
 
  }
 
  toggleSidebar(): void {
 
   this.showSidebar = !this.showSidebar;
 
  }
 
  updateProfile(): void {
 
   this.router.navigate(['update']);
 
  }
 
  orderFood(): void {
 
   this.router.navigate(['order']);
 
  }
 
  logout(): void {
 
   this.authService.logout();
 
   this.router.navigate(['login']);
 
  }

  

  gotoRestaurantRegister(){
    this.router.navigate(['Restaurantregister']);
  }

  gotoPreviousOrders(){
    this.router.navigate(['previousorders'])
  }

  deleteAccount(): void {
    if (this.customer && this.customer.customerID) {
      this.customerService.deleteCustomer(this.customer.customerID).subscribe(
        () => {
          this.authService.logout();
          this.router.navigate(['login']);
        },
        error => console.error('Error deleting customer account', error)
      );
    }
  }
 
 }