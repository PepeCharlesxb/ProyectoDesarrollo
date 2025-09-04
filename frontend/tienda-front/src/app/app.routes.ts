import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from '../pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  // Redirige cualquier ruta vacía a /login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Una ruta "catch-all" por si el usuario navega a una página que no existe
  { path: '**', redirectTo: '/login' }
];