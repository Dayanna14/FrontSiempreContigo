import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Valoracion } from '../models/valoracion';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ValoracionService {private url = `${base_url}/valoracionCurso`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Valoracion[]>(`${this.url}`);
  }

  listId(id: number) {
    return this.http.get<Valoracion>(`${this.url}/${id}`);
  }

  insert(v: Valoracion) {
    return this.http.post<Valoracion>(`${this.url}/nuevo`, v);
  }

  update(v: Valoracion) {
    return this.http.put(`${this.url}/actualiza`, v, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listarValoracionesPorCalificacionMinima(minCalificacion: number) {
    return this.http.get<any[]>(`${this.url}/valoraciones/min/${minCalificacion}`);
  }}
