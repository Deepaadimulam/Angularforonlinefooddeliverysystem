import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../Service/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryService } from '../Service/delivery.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-order-tracking',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css'
})
export class OrderTrackingComponent   implements OnInit, OnDestroy {



  order: any;

  delivery: any;

  menuItems: any[] = [];

  countdown: string = '';

  private subscription: Subscription = new Subscription();

  private pollSubscription: Subscription | undefined;



  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private orderService: OrderService,

    private deliveryService: DeliveryService

  ) {}



  ngOnInit(): void {

    const orderIdParam = this.route.snapshot.paramMap.get('orderId');

    if (orderIdParam !== null) {

      const orderId = +orderIdParam;

      

      this.loadOrder(orderId);

      this.loadDelivery(orderId);



      

      this.pollSubscription = interval(5000).subscribe(() => {

        this.loadOrder(orderId);

        this.loadDelivery(orderId);

      });

    } else {

      console.error('Order ID is null');

    }

  }



  ngOnDestroy(): void {



    if (this.subscription) {

      this.subscription.unsubscribe();

    }

    if (this.pollSubscription) {

      this.pollSubscription.unsubscribe();

    }

  }



  private loadOrder(orderId: number): void {

    this.orderService.findByOrderID(orderId).subscribe(

      data => {

        this.order = data;

        this.menuItems = data.menuItems;

      },

      error => console.error('Error fetching order', error)

    );

  }



  private loadDelivery(orderId: number): void {

    this.deliveryService.getDeliveryByOrderID(orderId).subscribe(

      data => {

        this.delivery = data;

        this.startCountdown(orderId);

      },

      error => console.error('Error fetching delivery', error)

    );

  }



  private startCountdown(orderId: number): void {

   
    if (this.subscription) {

      this.subscription.unsubscribe();

    }





    this.subscription = interval(1000).subscribe(() => {

      if (!this.delivery || !this.delivery.estimatedTimeOfArrival) return;



      const now = new Date().getTime();

      const eta = new Date(this.delivery.estimatedTimeOfArrival).getTime();

      const distance = eta - now;



      if (distance < 0) {

        this.countdown = 'Order has arrived!';

        this.updateDeliveryStatus(this.delivery.deliveryID, 'Delivered');

        this.subscription.unsubscribe();

      } else {

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.countdown = `${hours}h ${minutes}m ${seconds}s`;

      }

    });

  }



  private updateOrderStatus(orderId: number, status: string): void {

    this.order.status = status;

    this.orderService.updateOrderStatus(orderId, status).subscribe(

      () => console.log(`Order status updated to ${status}`),

      error => console.error('Error updating order status', error)

    );

  }



  private updateDeliveryStatus(deliveryId: number, status: string): void {

    this.delivery.status = status;

    this.deliveryService.updateDeliveryStatus(deliveryId, status).subscribe(

      () => console.log(`Delivery status updated to ${status}`),

      error => console.error('Error updating delivery status', error)

    );

  }



  gotoProfile() {

    this.router.navigate(['profile']);

  }

}











