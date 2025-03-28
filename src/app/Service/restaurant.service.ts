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

 
  getAllRestaurants(): Observable<Restaurant[]> {
    
 
   return <Observable<Restaurant[]>>this.http.get<Restaurant[]>(`${this.apiUrl}/all`);
 
  }
 

 
  getRestaurantById(restaurantID: number): Observable<Restaurant> {
 
   return this.http.get<Restaurant>(`${this.apiUrl}/${restaurantID}`);
 
  }
 

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
 
   return this.http.post<Restaurant>(`${this.apiUrl}/add`, restaurant);
 
  }
 

 
  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
 
   return this.http.put<Restaurant>(`${this.apiUrl}/update`, restaurant);
 
  }
 

 
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