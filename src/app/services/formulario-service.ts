import { Injectable } from '@angular/core';
import { environment } from '../../environment.development/environment.development';
import { HttpClient } from '@angular/common/http';
import { Formulario } from '../models/formulario';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private url = `${base_url}/Formulario`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Formulario[]>(`${this.url}`);
  }

  insert(f: Formulario) {
    return this.http.post<Formulario>(`${this.url}/nuevo`, f);
  }

  listId(id: number) {
    return this.http.get<Formulario>(`${this.url}/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  buscarReporteActividad() {
    return this.http.get<any[]>(`${this.url}/reporteQuery01`);
  }
}
