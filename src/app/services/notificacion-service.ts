import { Injectable } from '@angular/core';
import { environment } from '../../environment.development/environment.development';
import { HttpClient } from '@angular/common/http';
import { Notificacion } from '../models/notificacion';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class NotificacionService {private url = `${base_url}/notificaciones`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Notificacion[]>(`${this.url}/listar`);
  }

  insert(n: Notificacion) {
    return this.http.post(`${this.url}/nuevo`, n);
  }

  update(n: Notificacion) {
    return this.http.put(`${this.url}/Modificar`, n);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listActivas(idUsuario: number) {
    return this.http.get<Notificacion[]>(`${this.url}/usuario/${idUsuario}`);
  }

  leerTodo(idUsuario: number) {
    return this.http.put(`${this.url}/leer-todo/${idUsuario}`, {});
  }}
