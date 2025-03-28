import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../model/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
 
  private apiUrl = 'http://localhost:8083/menu';

  constructor(private http: HttpClient) {}
  
  updateMenuItem(menuItem: MenuItem, restaurantID: number): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.apiUrl}/update/${restaurantID}`, menuItem);
  }

 
  getMenuByRestaurantID(restaurantID: number): Observable<MenuItem[]> {
 
   return this.http.get<MenuItem[]>(`${this.apiUrl}/restaurant/${restaurantID}`);
 
  }
 

 
  addMenuItem(menuItem: MenuItem, restaurantID: number): Observable<MenuItem> {
 
   return this.http.post<MenuItem>(`${this.apiUrl}/add/${restaurantID}`, menuItem);
 
  }
 

 
  deleteMenuItem(itemID: number): Observable<void> {
 
   return this.http.delete<void>(`${this.apiUrl}/${itemID}`);
 
  }
 
 }