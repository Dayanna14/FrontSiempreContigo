import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-iniciar-sesion',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterLink],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css',
})
export class IniciarSesion implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // 👈 AGREGA ESTO
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
      
      if (username.toLowerCase().includes('doc') || username.toLowerCase().includes('psico')) {
        localStorage.setItem('token', 'jwt-professional-token');
        localStorage.setItem('role', 'PROFESSIONAL');
      } else {
        localStorage.setItem('token', 'jwt-patient-token');
        localStorage.setItem('role', 'PATIENT');
      }
      
      window.location.href = '/home';
    }
  }

  loginWithGoogle(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', 'jwt-oauth-google');
      localStorage.setItem('role', 'PATIENT');
      window.location.href = '/home';
    }
  }

  loginWithFacebook(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', 'jwt-oauth-facebook');
      localStorage.setItem('role', 'PATIENT');
      window.location.href = '/home';
    }
  }
}