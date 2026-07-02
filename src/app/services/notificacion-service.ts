import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notificacion } from '../models/notificacion';
import { environment } from '../environment/environment.development';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private url = `${base_url}/notificaciones`; 

  private listaCambio = new Subject<Notificacion[]>();

  constructor(private http: HttpClient) { }

  // @GetMapping("/listar")
  list(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.url}/listar`);
  }

  // @PostMapping("/nuevo")
  insert(n: Notificacion): Observable<void> {
    return this.http.post<void>(`${this.url}/nuevo`, n);
  }

  // @PutMapping("/Modificar") -> Ojo con la 'M' mayúscula de tu Controller
  update(n: Notificacion): Observable<void> {
    return this.http.put<void>(`${this.url}/Modificar`, n);
  }

  // @DeleteMapping("/{id}")
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // US010/US011: @GetMapping("/usuario/{id}")
  listarActivas(idUsuario: number): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.url}/usuario/${idUsuario}`);
  }

  // US010: @PutMapping("/leer-todo/{idUsuario}")
  leerTodo(idUsuario: number): Observable<void> {
    return this.http.put<void>(`${this.url}/leer-todo/${idUsuario}`, {});
  }

  // Métodos reactivos para refrescar componentes
  setList(listaNueva: Notificacion[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
