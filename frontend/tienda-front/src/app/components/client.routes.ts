import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

export const CLIENT_ROUTES: Routes = [
  { path: 'products', component: ProductListComponent },
  // Aquí irán otras rutas de cliente, como 'mi-cuenta', 'mis-pedidos', etc.
  { path: '', redirectTo: 'products', pathMatch: 'full' }
];