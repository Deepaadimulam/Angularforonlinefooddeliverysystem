import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../model/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8089/restaurants';

  constructor(private http: HttpClient) {}
 
  // Get all restaurants
 
  getAllRestaurants(): Observable<Restaurant[]> {
    
 
   return <Observable<Restaurant[]>>this.http.get<Restaurant[]>(`${this.apiUrl}/all`);
 
  }
 
  // Get restaurant by ID
 
  getRestaurantById(restaurantID: number): Observable<Restaurant> {
 
   return this.http.get<Restaurant>(`${this.apiUrl}/${restaurantID}`);
 
  }
 
  // Add a new restaurant
 
  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
 
   return this.http.post<Restaurant>(`${this.apiUrl}/add`, restaurant);
 
  }
 
  // Update a restaurant
 
  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
 
   return this.http.put<Restaurant>(`${this.apiUrl}/update`, restaurant);
 
  }
 
  // Delete a restaurant
 
  deleteRestaurant(restaurantID: number): Observable<void> {
 
   return this.http.delete<void>(`${this.apiUrl}/${restaurantID}`);
 
  }

  authenticateRestaurant(formData: FormData): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.apiUrl}/login`, formData);
  }

  searchRestaurantsByName(name: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/search?name=${name}`);
  }
 
 }