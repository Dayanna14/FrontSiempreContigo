import { Injectable } from '@angular/core';
import { environment } from '../../environment.development/environment.development';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Formulario } from '../models/formulario';
=======
import { Formulario } from '../components/formulario/formulario'; 
import { FormularioDTO } from '../models/formulario';
>>>>>>> origin/develop
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private url = `${base_url}/Formulario`;

  constructor(private http: HttpClient) {}

  list() {
<<<<<<< HEAD
    return this.http.get<Formulario[]>(`${this.url}`);
  }

  insert(f: Formulario) {
    return this.http.post<Formulario>(`${this.url}/nuevo`, f);
  }

  listId(id: number) {
    return this.http.get<Formulario>(`${this.url}/${id}`);
=======
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
<<<<<<< HEAD
=======
  
  update(mc: FormularioDTO) {
      return this.http.put(`${this.url}/actualiza`, mc, { responseType: 'text' });
    }


>>>>>>> origin/develop
}
