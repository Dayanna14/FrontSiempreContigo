import { Injectable } from '@angular/core';
import { environment } from '../../environment.development/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProgSesion } from '../models/prog-sesion';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ProgSesionService {
  private url = `${base_url}/progresoSesion`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ProgSesion[]>(`${this.url}`);
  }

  listId(id: number) {
    return this.http.get<ProgSesion>(`${this.url}/${id}`);
  }

  insert(ps: ProgSesion) {
    return this.http.post<ProgSesion>(`${this.url}/nuevo`, ps);
  }

  update(ps: ProgSesion) {
    return this.http.put(`${this.url}/actualiza`, ps, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
