import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-footer',
  standalone: true,  // <-- 1. Faltaba esta línea
  imports: [CommonModule], // <-- 2. Es bueno incluir CommonModule
  templateUrl: './footer.html', // <-- 3. Ruta corregida
  styleUrl: './footer.css'   // <-- 4. Ruta corregida
})
export class FooterComponent {

}