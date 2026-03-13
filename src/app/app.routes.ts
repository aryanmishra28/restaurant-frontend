import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Menu } from './components/menu/menu';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { CustomerOrders } from './components/customer-orders/customer-orders';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'menu', component: Menu },
    { path: 'admin', component: AdminDashboard },
    { path: 'orders', component: CustomerOrders },
    { path: '**', redirectTo: '' }
];
