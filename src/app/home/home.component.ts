import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router:Router){}

  restaurantregister(){
    this.router.navigate(['Restaurantregister'])
  }

  
  restaurantlogin(){
    this.router.navigate(['Restaurantlogin'])
  }

  
  register(){
    this.router.navigate(['register'])
  }

  login(){
    this.router.navigate(['login'])
  }



}
