import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerServiceService } from '../Service/customer-service.service';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  customer: any;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerServiceService,
    private authService: AuthService,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
    });
  }

  ngOnInit(): void {
    this.loadCustomerDetails();
  }

  loadCustomerDetails(): void {
    this.customer = this.authService.getCustomer();
    if (this.customer) {
      this.updateForm.patchValue(this.customer);
    } else {
      console.error('No customer details found');
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedCustomer = { ...this.customer, ...this.updateForm.value };
      this.customerService.updateCustomer(updatedCustomer).subscribe(
        response => {
          this.authService.setCustomer(response); 
          this.router.navigate(['profile'])
                 },
        error => {
          console.error('Profile update failed:', error); 
          alert('Profile update failed: ' + error.error.message); 
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  gotoprofile(){
    this.router.navigate(['profile'])
  }
}