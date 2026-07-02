import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient } from '@angular/common/http';

import { Formulario } from '../components/formulario/formulario'; 
import { FormularioDTO } from '../models/formulario';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private url = `${base_url}/Formulario`;

  constructor(private http: HttpClient) {}

  list() {

    return this.http.get<FormularioDTO[]>(`${this.url}`);
  }

  insert(f: FormularioDTO) {
    return this.http.post<FormularioDTO>(`${this.url}/nuevo`, f);
  }

  listId(id: number) {
    return this.http.get<FormularioDTO>(`${this.url}/${id}`);
>>>>>>> origin/develop
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  buscarReporteActividad() {
    return this.http.get<any[]>(`${this.url}/reporteQuery01`);
  }

  
  update(mc: FormularioDTO) {
      return this.http.put(`${this.url}/actualiza`, mc, { responseType: 'text' });
    }

}
