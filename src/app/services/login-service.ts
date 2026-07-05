import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtRequestDTO } from '../models/JwtRequestDTO ';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8085';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(request: JwtRequestDTO): Observable<{ jwttoken: string }> {
    return this.http.post<{ jwttoken: string }>(`${this.url}/login`, request);
  }

  guardarToken(token: string) {
    if (this.isBrowser()) {
      sessionStorage.setItem('token', token);
    }
  }

  cerrarSesion() {
    if (this.isBrowser()) {
      sessionStorage.clear();
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  verificar(): boolean {
    return this.isBrowser() && sessionStorage.getItem('token') !== null;
  }

  showRole(): string | null {
    if (!this.isBrowser()) return null;
    const token = sessionStorage.getItem('token');
    if (!token) return null;
    
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    
    return decodedToken.roles || decodedToken.role; 
  }
}