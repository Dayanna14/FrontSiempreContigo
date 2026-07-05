import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environment/environment.development';
import { Cursos } from '../models/cursos';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private url = `${base_url}/cursos`;
  
  private listaCambio = new Subject<Cursos[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.url);
  }

  insert(c: Cursos): Observable<Cursos> {
    return this.http.post<Cursos>(`${this.url}/nuevo`, c);
  }

  listId(id: number): Observable<Cursos> {
    return this.http.get<Cursos>(`${this.url}/${id}`);
  }

  update(c: Cursos): Observable<any> {
    return this.http.put(`${this.url}/actualiza`, c, { responseType: 'text' });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  reporteCursosPorTipo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/reporte-tipos`);
  }

  reporteCursosPorEspecialidad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/reporte-aporte-especialidad`);
  }

  setList(listaNueva: Cursos[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}