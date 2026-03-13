export interface Category {
    id: number;
    name: string;
}

export interface MenuItem {
    id: number;
    name: string;
    categoryId: number;
    category?: Category;
    price: number;
    description?: string;
    isAvailable: boolean;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
}

export interface OrderItem {
    id: number;
    orderId: number;
    menuItemId: number;
    menuItem?: MenuItem;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    customerId: number;
    customer?: Customer;
    orderDate: Date;
    totalAmount: number;
    status: string;
    orderItems?: OrderItem[];
}

export interface OrderItemDto {
    menuItemId: number;
    quantity: number;
}

export interface PlaceOrderDto {
    customerId: number;
    items: OrderItemDto[];
}
