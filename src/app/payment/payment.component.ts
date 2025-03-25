import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../Service/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';
import { OrderService } from '../Service/order.service';

@Component({
  selector: 'app-payment',
  imports: [ CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  orderId: number = 0;
  stripe: any;
  paymentMethods = ['Credit Card', 'Debit Card', 'Wallet'];
  sessionId: string = '';

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51R3W9vK1QfQWcb6cgpIPC74UsttpxyOP3hJ8XXDT4zmZy1q4MyRzSbspURgwIVLNXhZohINXZweUocOPXhE36Ddr00Umud1hKs');

    const orderIdParam = this.route.snapshot.paramMap.get('orderId');

    if (orderIdParam !== null) {

      this.orderId = +orderIdParam;

     

      localStorage.setItem('currentOrderId', String(this.orderId));

    } else {

      console.error('Order ID is null');

    }

  }

  createCheckoutSession(paymentMethod: string) {
    this.paymentService.createCheckoutSession(this.orderId, 'usd').subscribe(response => {
      this.sessionId = response.sessionId;
      this.redirectToStripe();
    });
  }

  async redirectToStripe() {
    const result = await this.stripe.redirectToCheckout({
      sessionId: this.sessionId
    });

    if (result.error) {
     
      alert(result.error.message);
    } else {
      this.router.navigate(['/payment-success'], { queryParams: { session_id: this.sessionId, orderId: this.orderId } });
    }
  }

  processPayment(paymentMethod: string) {
    this.createCheckoutSession(paymentMethod);
  }
}