import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { environment } from '../../environment.development/environment.development'; 
import { Observable, Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${base_url}/usuario`;
  
  private listaCambio = new Subject<Usuario[]>(); 

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(`${this.url}`);
  }

  insert(u: Usuario) {
    return this.http.post(`${this.url}/usuario/nuevo`, u);
  }

  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/usuario/${id}`);
  }

  update(u: Usuario) {
    return this.http.put(`${this.url}/usuario/actualiza`, u, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/usuario/${id}`, { responseType: 'text' });
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Usuario[]> {
    return this.listaCambio.asObservable();
  }
}