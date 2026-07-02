import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Cita } from '../models/cita';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private url = `${base_url}/citas`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Cita[]>(`${this.url}`);
  }

  insert(c: Cita) {
    return this.http.post<Cita>(`${this.url}/nuevo`, c);
  }

  listId(id: number) {
    return this.http.get<Cita>(`${this.url}/${id}`);
  }

  update(c: Cita) {
    return this.http.put(`${this.url}/actualiza`, c, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listTop10PorUsuario(idUsuario: number) {
    return this.http.get<Cita[]>(`${this.url}/top10/usuario/${idUsuario}`);
  }
}
