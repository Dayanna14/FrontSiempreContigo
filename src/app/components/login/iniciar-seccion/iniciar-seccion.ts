import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-iniciar-seccion',
  standalone: true, // Asegúrate de tener esto si estás usando componentes standalone
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './iniciar-seccion.html',
  styleUrl: './iniciar-seccion.css',
})
export class IniciarSeccion implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  ingresar(): void {
    if (this.form.valid && isPlatformBrowser(this.platformId)) {
      const { username } = this.form.value;
      
      // Lógica de simulación de roles
      if (username.toLowerCase().includes('doc') || username.toLowerCase().includes('psico')) {
        localStorage.setItem('token', 'jwt-professional-token');
        localStorage.setItem('role', 'PROFESSIONAL');
      } else {
        localStorage.setItem('token', 'jwt-patient-token');
        localStorage.setItem('role', 'PATIENT');
      }
      
      // Navegación fluida usando el Router de Angular
      this.router.navigate(['/homes']);
    }
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