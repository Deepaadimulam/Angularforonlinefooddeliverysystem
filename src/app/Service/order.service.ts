import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8084/orders';

  constructor(private http: HttpClient) {}
 
  // Place a new order

  
 
  placeOrder(customerID: number, menuItems: { itemID: number; quantity: number; price: number }[]): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/place?customerID=${customerID}`, menuItems);
  }
 
  // Get orders by customer ID
 
  getOrdersByCustomerID(customerID: number): Observable<Order[]> {
 
   return this.http.get<Order[]>(`${this.apiUrl}/customer/${customerID}`);
 
  }
 
  // Get order by ID
 
  findByOrderID(orderID: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderID}`);
  }
  // Delete an order
 
  deleteOrder(orderID: number): Observable<void> {
 
   return this.http.delete<void>(`${this.apiUrl}/${orderID}`);
 
  }

  updateOrderStatus(orderID: number, newStatus: string): Observable<any> {

    return this.http.put<any>(
  
     `${this.apiUrl}/status?orderID=${orderID}&status=${newStatus}`,
  
     {}
  
    );
  
   }
  getOrdersByRestaurantID(restaurantID: number): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl}/restaurant/${restaurantID}`);
  
   }
 
 }