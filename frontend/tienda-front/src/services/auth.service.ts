import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // 1. Importa HttpClient
import { Observable, tap, catchError, of } from 'rxjs'; // 2. Importa herramientas de RxJS

// La interfaz de Usuario sigue igual
export interface User {
  email: string;
  role: 'cliente' | 'admin' | 'personal';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 3. URL de tu API. Asegúrate de que 'proyectodesarrollo' coincida con el nombre de tu carpeta en htdocs.
  private apiUrl = 'http://localhost/App/api/auth/login.php';
  
  currentUser = signal<User | null>(null);

  // 4. Inyecta HttpClient y Router
  constructor(private http: HttpClient, private router: Router) { }

  // 5. El método login ahora devuelve un Observable
  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        // Esto se ejecuta si la petición es exitosa (código 200)
        if (response && response.user) {
          console.log('Respuesta del backend:', response);
          this.currentUser.set(response.user); // Guardamos el usuario que nos dio el backend
        }
      }),
      catchError(error => {
        // Esto se ejecuta si el backend devuelve un error (ej. 401 No Autorizado)
        console.error('Error en el login:', error);
        this.currentUser.set(null);
        return of(null); // Devuelve un observable nulo para que el componente sepa que falló
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}