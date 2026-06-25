import { Injectable } from '@angular/core';
import { environment } from '../../environment.development/environment.development';
import { HttpClient } from '@angular/common/http';
import { Cursos } from '../models/cursos';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private url = `${base_url}/cursos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Cursos[]>(`${this.url}`);
  }

  insert(c: Cursos) {
    return this.http.post<Cursos>(`${this.url}/nuevo`, c);
  }

  listId(id: number) {
    return this.http.get<Cursos>(`${this.url}/${id}`);
  }

  update(c: Cursos) {
    return this.http.put(`${this.url}/actualiza`, c, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  reporteTipos() {
    return this.http.get<any[]>(`${this.url}/reporte-tipos`);
  }

  reporteAporteEspecialidad() {
    return this.http.get<any[]>(`${this.url}/reporte-aporte-especialidad`);
  }
}
