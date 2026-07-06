import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginService } from '../../services/login-service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterLink, RouterModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private loginService: LoginService,
  private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.loginService.verificar();
  }

  get userRole(): string | null {
    return this.loginService.showRole();
  }

  logout(): void {
    this.loginService.cerrarSesion();
    this.router.navigate(['/login']); 
  }
}