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
    
    this.loginError = false;
    const credentials = this.loginForm.value;

    // Ahora nos suscribimos a la respuesta del servicio
    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Esto se ejecuta si el login es exitoso
        if (response && response.user) {
          const userRole = response.user.role;
          
          // Redirigimos según el rol que nos dio el backend
          switch (userRole) {
            case 'admin':
              this.router.navigate(['/admin/dashboard']);
              break;
            case 'cliente':
              this.router.navigate(['/products']);
              break;
            // ... otros casos
            default:
              this.router.navigate(['/login']);
          }
        } else {
          // Si el backend responde OK pero sin datos de usuario (caso raro)
          this.loginError = true;
        }
      },
      error: (err) => {
        // Esto se ejecuta si hay un error en la petición HTTP (ej. 401)
        this.loginError = true;
        console.error('Error de autenticación desde el componente:', err);
      }
    });
  }
}