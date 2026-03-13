import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { Order, MenuItem } from '../../models/restaurant.models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  orders: Order[] = [];
  menuItems: MenuItem[] = [];
  activeTab = 'orders'; // 'orders' | 'menu'

  newItemName = '';
  newItemPrice: number | null = null;
  newItemCategoryId = 1; // Default
  newItemDesc = '';

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.loadOrders();
    this.loadMenu();
  }

  loadOrders() {
    this.restaurantService.getAllOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Failed to load orders', err)
    });
  }

  loadMenu() {
    this.restaurantService.getMenu().subscribe({
      next: (data) => this.menuItems = data,
      error: (err) => console.error('Failed to load menu', err)
    });
  }

  updateOrderStatus(orderId: number, status: string) {
    this.restaurantService.updateOrderStatus(orderId, status).subscribe(() => {
      this.loadOrders();
    });
  }

  addMenuItem() {
    if (!this.newItemName || !this.newItemPrice) return;

    this.restaurantService.addMenuItem({
      name: this.newItemName,
      price: this.newItemPrice,
      description: this.newItemDesc,
      categoryId: this.newItemCategoryId,
      isAvailable: true
    }).subscribe(() => {
      this.loadMenu();
      this.newItemName = '';
      this.newItemPrice = null;
      this.newItemDesc = '';
    });
  }

  deleteMenuItem(id: number) {
    if (confirm('Are you sure you want to delete this menu item?')) {
      this.restaurantService.deleteMenuItem(id).subscribe(() => {
        this.loadMenu();
      });
    }
  }
}
