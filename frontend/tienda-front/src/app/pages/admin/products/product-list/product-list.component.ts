import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- 1. Importa CommonModule

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule], // <-- 2. Añádelo a los imports
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
  // Tu lógica para obtener productos irá aquí
  products: any[] = []; 
}