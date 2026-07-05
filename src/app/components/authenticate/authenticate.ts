import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequestDTO } from '../../models/JwtRequestDTO ';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, GoogleSigninButtonModule],  
  templateUrl: './authenticate.html',
  styleUrl: './authenticate.css',
})
export class Authenticate implements OnInit {
  username: string = '';
  contrasena: string = '';
  private url: string = 'http://localhost:8080';
  
  private platformId = inject(PLATFORM_ID);
  // Definimos la variable como 'any' para evitar conflictos de tipos
  private authService: any = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // Solo accedemos al servicio de Google si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.authService = inject(SocialAuthService);
      
      this.authService.authState.subscribe((user: any) => {
        if (user && user.idToken) {
          // CAMBIA AQUÍ LA RUTA POR LA QUE TU BACKEND ESPERA
          this.loginWithGoogleBackend(user.idToken).subscribe({
            next: (response: any) => {
              sessionStorage.setItem('token', response.token);
              this.router.navigate(['/homes']);
            },
            error: (err: any) => {
              this.snackBar.open('Error al validar cuenta con Google', 'Cerrar', { duration: 3000 });
              console.error(err);
            }
          });
        }
      });
    }
  }

  login() {
    const request = new JwtRequestDTO();
    request.username = this.username;
    request.contrasena = this.contrasena;

    this.loginService.login(request).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['/homes']);
      },
      error: (error: any) => {
        this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // Asegúrate que esta URL coincida con tu @PostMapping en Spring Boot
  loginWithGoogleBackend(idToken: string) {
    return this.http.post<any>(`${this.url}/login-google`, { token: idToken }); 
  }
}