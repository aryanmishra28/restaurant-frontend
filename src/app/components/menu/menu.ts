import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuItem, PlaceOrderDto } from '../../models/restaurant.models';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {
  menuItems: MenuItem[] = [];
  cart: { item: MenuItem, quantity: number }[] = [];
  loading = true;
  orderSuccess = false;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this.restaurantService.getMenu().subscribe({
      next: (data) => {
        this.menuItems = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading menu', err);
        this.loading = false;
      }
    });
  }

  addToCart(item: MenuItem) {
    const existing = this.cart.find(c => c.item.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ item, quantity: 1 });
    }
  }

  removeFromCart(item: MenuItem) {
    const index = this.cart.findIndex(c => c.item.id === item.id);
    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  get cartTotal() {
    return this.cart.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
  }

  placeOrder() {
    if (this.cart.length === 0) return;

    // Hardcoding CustomerId = 1 as per typical backend testing setups.
    const dto: PlaceOrderDto = {
      customerId: 1,
      items: this.cart.map(c => ({
        menuItemId: c.item.id,
        quantity: c.quantity
      }))
    };

    this.restaurantService.placeOrder(dto).subscribe({
      next: (res) => {
        this.cart = [];
        this.orderSuccess = true;
        setTimeout(() => this.orderSuccess = false, 5000);
      },
      error: (err) => console.error('Order failed', err)
    });
  }
}
