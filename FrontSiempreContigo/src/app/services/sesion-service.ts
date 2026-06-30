import { Injectable } from '@angular/core';
import { environment } from '../../environment.development/environment.development';
import { HttpClient } from '@angular/common/http';
import { Sesion } from '../models/sesion';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class SesionService {
  private url = `${base_url}/Sesion`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Sesion[]>(`${this.url}`);
  }

  listId(id: number) {
    return this.http.get<Sesion>(`${this.url}/${id}`);
  }

  insert(s: Sesion) {
    return this.http.post<Sesion>(`${this.url}/nuevo`, s);
  }

  update(s: Sesion) {
    return this.http.put(`${this.url}/actualizar`, s, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`, { responseType: 'text' });
  }

  obtenerReporteCursosIncompletos() {
    return this.http.get<any[]>(`${this.url}/cursos-incompletos`);
  }
}
