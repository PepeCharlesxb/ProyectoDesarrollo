import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUser();

  // Obtenemos el rol esperado desde la data de la ruta
  const expectedRole = route.data['expectedRole'];

  if (currentUser && currentUser.role === expectedRole) {
    // Si hay usuario y su rol coincide, permite el acceso
    return true;
  } else {
    // Si no, redirige al login
    console.warn('Acceso denegado - Rol incorrecto o no autenticado');
    router.navigate(['/login']);
    return false;
  }
};