import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

// 1. Definimos una interfaz para el usuario
export interface User {
  email: string;
  role: 'cliente' | 'admin' | 'personal';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 2. Usamos una señal para guardar el usuario actual (o null si no hay sesión)
  currentUser = signal<User | null>(null);

  constructor(private router: Router) { }

  // 3. Simulación de la función de login
  login(email: string, password: string):boolean {
    // En un futuro, aquí harías una llamada HTTP a tu backend con MySQL
    // Por ahora, simulamos la lógica
    if (email === 'admin@tienda.com' && password === '123456') {
      const user: User = { email: 'admin@tienda.com', role: 'admin' };
      this.currentUser.set(user); // Guardamos el usuario en la señal
      console.log('Login exitoso como Administrador');
      return true;
    } else if (email === 'cliente@tienda.com' && password === '123456') {
      const user: User = { email: 'cliente@tienda.com', role: 'cliente' };
      this.currentUser.set(user);
      console.log('Login exitoso como Cliente');
      return true;
    }
    
    // Si las credenciales son incorrectas
    console.error('Credenciales incorrectas');
    return false;
  }

  logout() {
    this.currentUser.set(null); // Limpiamos el usuario
    this.router.navigate(['/login']); // Redirigimos al login
  }
}