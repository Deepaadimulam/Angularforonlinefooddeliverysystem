import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../Service/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-success',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent  implements OnInit {
  sessionId: string | null = null;
  orderId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
   
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
    this.orderId = this.route.snapshot.queryParamMap.get('orderId');

   
    if (this.sessionId && this.orderId) {
     
      this.paymentService.confirmPayment(+this.orderId, 'StripeCheckout')
        .subscribe({
          next: (payment) => {
            alert("Your Order is placed Successfully");
            console.log('Payment record updated:', payment);
          },
          error: (err) => {
            console.error('Failed to confirm payment:', err);
          }
        });
    }
  }

  gotoOrderTracking() {
    if (this.orderId) {
      this.router.navigate(['/order-tracking', this.orderId]);
    } else {
      console.error('Order ID is null');
    }
  }
}