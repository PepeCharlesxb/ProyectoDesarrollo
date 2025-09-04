import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../pages/admin/dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  // 1. LA REDIRECCIÓN DE LA RUTA RAÍZ DEBE IR PRIMERO
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 2. RUTAS INDEPENDIENTES (SIN LAYOUT)
  { path: 'login', component: LoginComponent },
  
  // 3. RUTAS QUE USAN EL DISEÑO PRINCIPAL (CON LAYOUT)
  { 
    path: '', 
    component: MainLayoutComponent,
    children: [
      { 
        path: 'products', 
        component: ProductListComponent,
        canActivate: [authGuard],
        data: { expectedRole: 'cliente' }
      },
      {
        path: 'admin/dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        data: { expectedRole: 'admin' }
      },
    ]
  },
  
  // 4. LA RUTA COMODÍN (WILDCARD) SIEMPRE AL FINAL
  { path: '**', redirectTo: '/login' }
];