import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantService } from '../Service/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantregister',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './restaurantregister.component.html',
  styleUrl: './restaurantregister.component.css'
})
export class RestaurantregisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      logoUrl: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.restaurantService.addRestaurant(this.registerForm.value).subscribe(
        response => {
          alert('Registration successful!');
          this.router.navigate(['/Restaurantlogin']);
        },
        error => {
          console.error('Registration failed:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
    }
  }
}