import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../model/Payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8086/payments';

  constructor(private http: HttpClient) {}

  createCheckoutSession(orderID: number, currency: string): Observable<{ sessionId: string }> {
    return this.http.post<{ sessionId: string }>(`${this.apiUrl}/create-checkout-session`, { orderID, currency });
  }

  createPaymentIntent(orderID: number, currency: string): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(`${this.apiUrl}/create-payment-intent`, { orderID, currency });
  }


  confirmPayment(orderID: number, paymentMethod: string): Observable<Payment> {



  return this.http.get<Payment>(

    `${this.apiUrl}/confirm-checkout?orderID=${orderID}&paymentMethod=${paymentMethod}`

  );

}


  getPaymentByOrderID(orderID: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/order/${orderID}`);
  }


  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/all`);
  }

  deletePayment(paymentID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${paymentID}`);
  }
}