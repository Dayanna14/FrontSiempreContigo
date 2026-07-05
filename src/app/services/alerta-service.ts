import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Alerta } from '../models/alerta';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private url = `${base_url}/alertas`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Alerta[]>(`${this.url}/listar`);
  }

  insert(a: Alerta) {
    return this.http.post(`${this.url}/nuevo`, a);
  }

  update(a: Alerta) {
    return this.http.put(`${this.url}/actualizar`, a);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listPendientes(idProf: number) {
    return this.http.get<Alerta[]>(`${this.url}/pendientes-profesional/${idProf}`);
  }

  searchTipo(tipo: string) {
    return this.http.get<Alerta[]>(`${this.url}/buscar-tipo`, {
      params: { tipo: tipo }
    });
  }
}
