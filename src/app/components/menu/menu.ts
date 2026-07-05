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
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menucomponent {
  role: string = '';
  usuario: string = '';
  constructor(
    private router: Router,
    private loginService: LoginService 
  ) {}

  

  //get isLoggedIn(): boolean {
  //  return this.loginService.verificar();
  //}
//
  //get userRole(): string | null {
  //  return this.loginService.showRole();
  //}

verificar(): boolean{
const existe = this.loginService.verificar();
if(existe){
  this.role = this.loginService.showRole() ?? '';
}
return existe;
}



  logout(): void {
    this.loginService.cerrarSesion();
    this.router.navigate(['/login']); 
  }


isPROFESIONAL(){
  return this.role === "PROFESIONAL";
}

isPACIENTE(){
  return this.role === "PACIENTE";
}

}