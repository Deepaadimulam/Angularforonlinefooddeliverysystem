import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerServiceService } from '../Service/customer-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successmessage:string|null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerServiceService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.customerService.loginMethod(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (response: Customer) => {
          console.log('Login successful:', response);
          this.authService.setCustomer(response); 
          this.router.navigate(['/profile']);
        },
        error => {
          console.error('Login failed:', error); 
          this.errorMessage = 'Login unsuccessful. You do not have an account. Please register.';
        },
      );
    }
  }

  gotoregister(): void {
    this.router.navigate(['/register']);
  }
}