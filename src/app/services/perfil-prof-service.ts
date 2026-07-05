import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfilProf } from '../models/perfil-prof';
import { environment } from '../environment/environment.development';
import { Observable, Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class PerfilProfService {
private url = `${base_url}/perfilProfesional`; 
  
  private listaCambio = new Subject<PerfilProf[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<PerfilProf[]> {
    return this.http.get<PerfilProf[]>(this.url);
  }

  insert(p: PerfilProf): Observable<PerfilProf> {
    return this.http.post<PerfilProf>(`${this.url}/nuevo`, p);
  }

  listId(id: number): Observable<PerfilProf> {
    return this.http.get<PerfilProf>(`${this.url}/${id}`);
  }

  update(p: PerfilProf): Observable<any> {
    // 2. CORRECCIÓN: Agregar responseType para evitar errores de parseo JSON
    return this.http.put(`${this.url}/actualiza`, p, { responseType: 'text' });
  }

  delete(id: number): Observable<any> {
    // 2. CORRECCIÓN: Agregar responseType
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  buscarPorEspecialidad(especialidad: string) {
    return this.http.get<any[]>(`${this.url}/buscar`, {
      params: { especialidad: especialidad }
    });
  }

  buscarInformacion(filtro: string) {
    return this.http.get<any[]>(`${this.url}/Query02`, {
      params: { filtro: filtro }
    });
  }

  setList(listaNueva: PerfilProf[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}