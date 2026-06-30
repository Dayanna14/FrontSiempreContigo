import { Injectable } from '@angular/core';
import { environment } from '../../environment.development/environment.development';
import { HttpClient } from '@angular/common/http';
import { PerfilProf } from '../models/perfil-prof';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class PerfilProfService {
  private url = `${base_url}/perfilProfesional`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<PerfilProf[]>(`${this.url}`);
  }

  insert(p: PerfilProf) {
    return this.http.post<PerfilProf>(`${this.url}/nuevo`, p);
  }

  listId(id: number) {
    return this.http.get<PerfilProf>(`${this.url}/${id}`);
  }

  update(p: PerfilProf) {
    return this.http.put(`${this.url}/actualiza`, p, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }


listTop10PorUsuario(idUsuario: number) {
    return this.http.get<PerfilProf[]>(`${this.url}/top10/usuario/${idUsuario}`);
  }


  //buscarPorEspecialidad(especialidad: string) {
  //  return this.http.get<any[]>(`${this.url}/buscar`, {
  //    params: { especialidad: especialidad }
  //  });
  //}
//
  //buscarInformacion(filtro: string) {
  //  return this.http.get<any[]>(`${this.url}/Query02`, {
  //    params: { filtro: filtro }
  //  });
  //}
}
