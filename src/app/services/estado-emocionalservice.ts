import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EstadoEmocional } from "../models/estado-emocional";
import { environment } from "../../environment.development/environment.development";
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EstadoEmocionalservice {
   private url = `${base_url}/estados-emocionales`; 

  private listaCambio = new Subject<EstadoEmocional[]>();

  constructor(private http: HttpClient) { }

  // @GetMapping("/listar")
  list(): Observable<EstadoEmocional[]> {
    return this.http.get<EstadoEmocional[]>(`${this.url}/listar`);
  }

  // @PostMapping("/nuevo")
  insert(ee: EstadoEmocional): Observable<void> {
    return this.http.post<void>(`${this.url}/nuevo`, ee);
  }

  // @PutMapping("/actualizar")
  update(ee: EstadoEmocional): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar`, ee);
  }

  // @DeleteMapping("/{id}")
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // @GetMapping("/{id}")
  listId(id: number): Observable<EstadoEmocional> {
    return this.http.get<EstadoEmocional>(`${this.url}/${id}`);
  }

  // US007: Historial por Paciente -> @GetMapping("/paciente/{id}")
  buscarHistorial(idPaciente: number): Observable<EstadoEmocional[]> {
    return this.http.get<EstadoEmocional[]>(`${this.url}/paciente/${idPaciente}`);
  }

  // US004: Datos para Gráfico Semanal -> @GetMapping("/reporte-semanal/{id}")
  reporteSemanal(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/reporte-semanal/${idUsuario}`);
  }

  // Métodos reactivos para actualizar componentes dinámicamente
  setList(listaNueva: EstadoEmocional[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
