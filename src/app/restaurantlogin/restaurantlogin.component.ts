import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantService } from '../Service/restaurant.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurantlogin',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './restaurantlogin.component.html',
  styleUrl: './restaurantlogin.component.css'
})
export class RestaurantloginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = new FormData();
      formData.append('email', this.loginForm.value.email);
      formData.append('password', this.loginForm.value.password);

      this.restaurantService.authenticateRestaurant(formData).subscribe(
        response => {
          localStorage.setItem('restaurant', JSON.stringify(response));
          alert("login successfull");
          this.router.navigate(['/restaurant-profile']);
        },
        error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      );
    }
  }
}