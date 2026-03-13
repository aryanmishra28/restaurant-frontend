import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MenuItem, Order, PlaceOrderDto } from '../models/restaurant.models';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // Menu Endpoints
    getMenu(): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${this.apiUrl}/Menu`);
    }

    addMenuItem(item: Partial<MenuItem>): Observable<MenuItem> {
        return this.http.post<MenuItem>(`${this.apiUrl}/Menu`, item);
    }

    deleteMenuItem(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/Menu/${id}`);
    }

    // Orders Endpoints
    placeOrder(dto: PlaceOrderDto): Observable<{ orderId: number; totalAmount: number }> {
        return this.http.post<{ orderId: number; totalAmount: number }>(`${this.apiUrl}/Orders/place`, dto);
    }

    updateOrderStatus(orderId: number, status: string): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrl}/Orders/status/${orderId}?status=${status}`, {});
    }

    getCustomerOrders(customerId: number): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/Orders/customer/${customerId}`);
    }

    getAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/Orders`);
    }
}
