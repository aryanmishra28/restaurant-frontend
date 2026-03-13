import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { Order } from '../../models/restaurant.models';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './customer-orders.html',
  styleUrl: './customer-orders.css'
})
export class CustomerOrders {
  customerId: number | null = 1;
  orders: Order[] = [];
  loading = false;
  searched = false;

  constructor(private restaurantService: RestaurantService) { }

  fetchOrders() {
    if (!this.customerId) return;
    this.loading = true;
    this.searched = true;
    this.restaurantService.getCustomerOrders(this.customerId).subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders', err);
        this.loading = false;
      }
    });
  }
}
