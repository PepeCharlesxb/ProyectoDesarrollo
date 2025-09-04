import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importa el servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html', // Asegúrate que esta ruta apunte al archivo renombrado
  styleUrl: './login.css'   // Y esta también
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false; // Para mostrar un mensaje de error

  // Inyectamos FormBuilder, Router y nuestro nuevo AuthService
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    
    this.loginError = false; // Reseteamos el error
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Llamamos al servicio de login
    const isLoggedIn = this.authService.login(email, password);

    if (isLoggedIn) {
      // Si el login fue exitoso, obtenemos el rol
      const userRole = this.authService.currentUser()?.role;

      // Redirigimos según el rol
      switch (userRole) {
        case 'admin':
          this.router.navigate(['/admin/dashboard']); // Futura ruta de admin
          break;
        case 'cliente':
          this.router.navigate(['/products']);
          break;
        case 'personal':
          this.router.navigate(['/staff/tasks']); // Futura ruta de personal
          break;
        default:
          this.router.navigate(['/login']); // Si algo falla, de vuelta al login
      }
    } else {
      // Si el login falla, mostramos un error
      this.loginError = true;
    }
  }
}