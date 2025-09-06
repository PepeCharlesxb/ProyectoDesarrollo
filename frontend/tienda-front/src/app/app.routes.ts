import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../pages/admin/dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { ADMIN_ROUTES } from '../pages/admin/admin.routes';
import { CLIENT_ROUTES } from './components/client.routes';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { 
    path: 'admin', 
    component: MainLayoutComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'admin' },
    loadChildren: () => ADMIN_ROUTES
  },

  { 
    path: 'client', 
    component: MainLayoutComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'cliente' },
    loadChildren: () => CLIENT_ROUTES 
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];