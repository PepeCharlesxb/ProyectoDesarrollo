import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importa el servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;

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
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loginError = false;
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response && response.user) {
          const userRole = response.user.role;
          
          switch (userRole) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            case 'cliente':
              this.router.navigate(['/client']);
              break;
            default:
              // Si el rol no es reconocido, se puede enviar a una página por defecto o al login
              this.router.navigate(['/login']);
          }
        } else {
          // Esto se activa si la petición fue exitosa pero no vino el usuario en la respuesta.
          this.loginError = true;
        }
      },
      error: (err) => {
        // Esto se ejecuta si la petición HTTP falla (ej. error 401, 404, etc.)
        this.loginError = true;
        console.error('Error de autenticación desde el componente:', err);
      }
    });
  }
}