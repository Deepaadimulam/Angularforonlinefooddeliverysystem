import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../model/Delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'http://localhost:8082/delivery';

  constructor(private http: HttpClient) {}
  
 

 
  assignDeliveryAgent(orderID: number, agentID: number): Observable<Delivery> {
 
   return this.http.post<Delivery>(`${this.apiUrl}/assign?orderID=${orderID}&agentID=${agentID}`, {});
 
  }
 

 
  getAllDeliveries(): Observable<Delivery[]> {
 
   return this.http.get<Delivery[]>(`${this.apiUrl}/all`);
 
  }

 
  deleteDelivery(deliveryID: number): Observable<void> {
 
   return this.http.delete<void>(`${this.apiUrl}/${deliveryID}`);
 
  }
  getDeliveryByOrderID(orderID: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/order/${orderID}`);
  }

  updateDeliveryStatus(deliveryID: number, status: string): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.apiUrl}/updateStatus/${deliveryID}?status=${status}`, {});
}
}