import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from '../../app/components/product-list/product-list.component';
import { ProductFormComponent } from '../../app/pages/admin/products/product-form/product-form.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent }, // Para crear productos
  { path: 'products/edit/:id', component: ProductFormComponent }, // Para editar productos
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];