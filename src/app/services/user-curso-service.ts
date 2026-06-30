import { Injectable } from '@angular/core';
import { environment } from '../../environment.development/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserCurso } from '../models/user-curso';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UserCursoService {
  private url = `${base_url}/usuarioCurso`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<UserCurso[]>(`${this.url}`);
  }

  listId(id: number) {
    return this.http.get<UserCurso>(`${this.url}/${id}`);
  }

  insert(uc: UserCurso) {
    return this.http.post<UserCurso>(`${this.url}/nuevo`, uc);
  }

  update(uc: UserCurso) {
    return this.http.put(`${this.url}/actualiza`, uc, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listarCursosPorUsuario(idUsuario: number) {
    return this.http.get<any[]>(`${this.url}/cursos/${idUsuario}`);
  }
}
