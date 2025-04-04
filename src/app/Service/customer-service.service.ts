import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  

  private apiUrl = 'http://localhost:8081/customer';

  constructor(private http: HttpClient) {}
 
  
 
  registerCustomer(customer: Customer): Observable<Customer> {
 
   return this.http.post<Customer>(`${this.apiUrl}/customer`, customer);
 
  }
 

  loginMethod(email: string, password: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/login?email=${email}&password=${password}`);
  }

 
  getCustomerById(id: number): Observable<Customer> {
 
   return this.http.get<Customer>(`${this.apiUrl}/id/${id}`);
 
  }
 

 
  getCustomerByEmail(email: string): Observable<Customer> {
 
   return this.http.get<Customer>(`${this.apiUrl}/${email}`);
 
  }
 
 
  updateCustomer(customer: Customer): Observable<Customer> {
 
   return this.http.put<Customer>(`${this.apiUrl}/customerupdate`, customer);
 
  }
 
 
 
  deleteCustomer(customerID: number): Observable<void> {
 
   return this.http.delete<void>(`${this.apiUrl}/${customerID}`);
 
  }
}
