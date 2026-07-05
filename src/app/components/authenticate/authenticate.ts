import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequestDTO } from '../../models/JwtRequestDTO ';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],  
  templateUrl: './authenticate.html',
  styleUrl: './authenticate.css',
})
export class Authenticate implements OnInit {
  username: string = '';
  contrasena: string = '';
  mensaje: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void { }

  login() {
    const request = new JwtRequestDTO();
    request.username = this.username;
    request.contrasena = this.contrasena;

    this.loginService.login(request).subscribe({
      next: (data: any) => {
        // Guarda el token correctamente
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['/homes']); // Asegura el '/'
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401 || error.status === 403) {
          this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        } else {
          this.snackBar.open('Ocurrió un error al iniciar sesión', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      }
    });
  }

  loginWithGoogle(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Unificado a sessionStorage
      sessionStorage.setItem('token', 'jwt-oauth-google');
      sessionStorage.setItem('role', 'PATIENT');
      this.router.navigate(['/homes']);
    }
  }

  loginWithFacebook(): void {
    if (isPlatformBrowser(this.platformId)) {
       // Unificado a sessionStorage
      sessionStorage.setItem('token', 'jwt-oauth-facebook');
      sessionStorage.setItem('role', 'PATIENT');
      this.router.navigate(['/homes']);
    }
  }
}