import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../Service/restaurant.service';
import { Router } from '@angular/router';
import { MenuService } from '../Service/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant-profile',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './restaurant-profile.component.html',
  styleUrl: './restaurant-profile.component.css'
})
export class RestaurantProfileComponent implements OnInit {
  restaurant: any;
  menuItems: any[] = [];
  newMenuItem: any = { name: '', description: '', price: 0, imageUrl: '' };
  editMode: boolean = false;
  formVisible: boolean = false;

  constructor(
    private restaurantService: RestaurantService,
    private menuItemService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const restaurantData = localStorage.getItem('restaurant');
    if (restaurantData) {
      this.restaurant = JSON.parse(restaurantData);
      this.loadMenuItems();
    } else {
      this.router.navigate(['/restaurant-login']);
    }
  }

  loadMenuItems(): void {
    this.menuItemService.getMenuByRestaurantID(this.restaurant.restaurantID).subscribe(
      (items: any[]) => {
        this.menuItems = items;
      },
      error => {
        console.error('Failed to load menu items:', error);
      }
    );
  }

  showForm(): void {
    this.formVisible = true;
    this.editMode = false;
    this.newMenuItem = { name: '', description: '', price: 0, imageUrl: '' };
  }

  hideForm(): void {
    this.formVisible = false;
  }

  addMenuItem(): void {
    this.menuItemService.addMenuItem(this.newMenuItem, this.restaurant.restaurantID).subscribe(
      item => {
        this.menuItems.push(item);
        this.newMenuItem = { name: '', description: '', price: 0, imageUrl: '' };
        this.formVisible = false;
      },
      error => {
        console.error('Failed to add menu item:', error);
      }
    );
  }

  editMenuItem(item: any): void {
    this.newMenuItem = { ...item };
    this.editMode = true;
    this.formVisible = true;
  }

  updateMenuItem(): void {
    this.menuItemService.updateMenuItem(this.newMenuItem, this.restaurant.restaurantID).subscribe(
      updatedItem => {
        const index = this.menuItems.findIndex(i => i.itemID === updatedItem.itemID);
        if (index !== -1) {
          this.menuItems[index] = updatedItem;
        }
        this.newMenuItem = { name: '', description: '', price: 0, imageUrl: '' };
        this.editMode = false;
        this.formVisible = false;
      },
      error => {
        console.error('Failed to update menu item:', error);
      }
    );
  }

  deleteMenuItem(itemID: number): void {
    this.menuItemService.deleteMenuItem(itemID).subscribe(
      () => {
        this.menuItems = this.menuItems.filter(item => item.itemID !== itemID);
      },
      error => {
        console.error('Failed to delete menu item:', error);
      }
    );
  }

  viewOrders(): void {

    this.router.navigate(['/restaurant-orders']);
  
   }
}