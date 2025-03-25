import { Injectable } from '@angular/core';
import { Customer } from '../model/Customer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private customer: Customer | null = null;

  constructor(private router:Router) {}

  setCustomer(customer: Customer): void {
    this.customer = customer;
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  getCustomer(): Customer | null {
    if (!this.customer) {
      const storedCustomer = localStorage.getItem('customer');
      if (storedCustomer) {
        this.customer = JSON.parse(storedCustomer);
      }
    }
    return this.customer;
  }

  clearCustomer(): void {
    this.customer = null;
    localStorage.removeItem('customer');
  }

  logout(): void {
    this.clearCustomer();
    this.router.navigate(['']);
  }
}