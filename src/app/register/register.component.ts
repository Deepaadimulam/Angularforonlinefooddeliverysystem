import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerServiceService } from '../Service/customer-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerServiceService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.customerService.registerCustomer(this.registerForm.value).subscribe(
        response => {
          console.log(response)
          alert('Registration successful! Please login.');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed:', error);
          this.errorMessage = error.error;
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  gotologin(): void {
    this.router.navigate(['/login']);
  }
}