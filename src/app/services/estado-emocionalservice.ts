import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EstadoEmocional } from "../models/estado-emocional";
import { environment } from '../environment/environment.development';
import { Observable } from "rxjs";



const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class EstadoEmocionalservice {
    private url = `${base_url}/estados-emocionales`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<EstadoEmocional[]>(`${this.url}/listar`);
  }

  insert(ee: EstadoEmocional) {
    return this.http.post(`${this.url}/nuevo`, ee);
  }

  update(ee: EstadoEmocional) {
    return this.http.put(`${this.url}/actualizar`, ee);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

   listId(id: number) {
    return this.http.get<EstadoEmocional>(`${this.url}/${id}`);
  }

  getReporteTendencia(): Observable<any[]> {
   return this.http.get<any[]>(`${this.url}/reporte`); 
  }
buscarHistorialPorPaciente(pacienteId: number) {
    return this.http.get<EstadoEmocional[]>(`${this.url}/paciente/${pacienteId}`);
  }
}
