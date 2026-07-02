import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Alerta } from '../models/alerta';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private url = `${base_url}/alertas`;
  private listaCambio = new Subject<Alerta[]>();

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
  
  // @GetMapping("/pendientes-profesional/{idProf}")
  listarPendientes(idProf: number): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.url}/pendientes-profesional/${idProf}`);
  }

  // @GetMapping("/buscar-tipo")
  buscarPorTipo(tipo: string): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.url}/buscar-tipo`, {
      params: { tipo: tipo }
    });
  }

  // Métodos para reactividad de datos en la tabla componentes
  setList(listaNueva: Alerta[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  
}
