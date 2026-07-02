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
import { Loginservice } from '../../services/login-service';

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

role: string='';
usuario: string ='';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private loginservice: Loginservice
  ) {}

  get isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('token');
  }

  get userRole(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('role') : null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.router.navigate(['/homes']);
  }


  verificar():boolean{
    const existe = this.loginservice.verificar();
    if(existe){
      this.role = this.loginservice.showRole() ?? '';
    }
    return existe;
  }

  isProfesional(){
    return this.role === 'PROFESIONAL';
  }

  isPaciente(){
    return this.role === 'PACIENTE';
  }

}