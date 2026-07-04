import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menucomponent {
  constructor(
    private router: Router,
    private loginService: LoginService 
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