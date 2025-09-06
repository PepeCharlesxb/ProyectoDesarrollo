import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../app/components/header/header.component';
import { FooterComponent } from '../../app/components/footer/footer.component';
import { AuthService } from '../../services/auth.service'; // <-- Importa el servicio

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {
  // Inyectamos el servicio para poder usarlo en la plantilla
  authService = inject(AuthService); 
}