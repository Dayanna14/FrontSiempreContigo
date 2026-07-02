import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chat';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = `${base_url}/mensajes-chat`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Chat[]>(`${this.url}`);
  }

  insert(mc: Chat) {
    return this.http.post<Chat>(`${this.url}/nuevo`, mc);
  }

  listId(id: number) {
    return this.http.get<Chat>(`${this.url}/${id}`);
  }

  update(mc: Chat) {
    return this.http.put(`${this.url}/actualiza`, mc, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listTop10PorUsuario(idUsuario: number) {
    return this.http.get<Chat[]>(`${this.url}/top10/usuario/${idUsuario}`);
  }
}
