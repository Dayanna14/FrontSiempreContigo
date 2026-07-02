import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { JwtRequestDTO } from '../../models/jwt-request-dto'; 
import { Router, RouterLink } from '@angular/router';
import { Loginservice } from '../../services/login-service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-authenticate',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './authenticate.html',
  styleUrl: './authenticate.css',
})
export class Authenticate implements OnInit {
  constructor(
    private loginService: Loginservice,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder, 

  ) { }

  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void { }

  login() {
    const request = new JwtRequestDTO();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['homes']);
      },
      error: (error) => {
        console.log(error);

        if (error.status === 401) {
          this.snackBar.open(
            'Usuario o contraseña incorrectos',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        } else {
          this.snackBar.open(
            'Ocurrió un error al iniciar sesión',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        }
      }
    });
  }

loginWithGoogle(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', 'jwt-oauth-google');
      localStorage.setItem('role', 'PATIENT');
      this.router.navigate(['/homes']);
    }
  }

  loginWithFacebook(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', 'jwt-oauth-facebook');
      localStorage.setItem('role', 'PATIENT');
      this.router.navigate(['/homes']);
    }
  }

}
