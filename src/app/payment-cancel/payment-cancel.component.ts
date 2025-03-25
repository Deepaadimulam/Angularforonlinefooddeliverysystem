import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../Service/order.service';

@Component({
  selector: 'app-payment-cancel',
  imports: [],
  templateUrl: './payment-cancel.component.html',
  styleUrl: './payment-cancel.component.css'
})
export class PaymentCancelComponent  implements OnInit {



  orderId: number = 0;



  constructor(private router: Router) {}



  ngOnInit(): void {

    // Retrieve the orderId from localStorage

    const storedId = localStorage.getItem('currentOrderId');

    if (storedId) {

      this.orderId = +storedId;

      console.log('Payment canceled for orderId:', this.orderId);

    } else {

      console.error('No currentOrderId found in localStorage');

    }

  }



  retryPayment() {

    if (this.orderId > 0) {

      // Navigate back to the Payment page

      this.router.navigate(['/payment', this.orderId]);

    } else {

      alert('No valid orderId found. Please start a new order.');

      // Or navigate somewhere else

    }

  }

} 