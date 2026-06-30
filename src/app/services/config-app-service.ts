import { Injectable } from '@angular/core';
import { environment } from '../../environment.development/environment.development';
import { HttpClient } from '@angular/common/http';
import { ConfigApp } from '../models/config-app';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ConfigAppService {
  private url = `${base_url}/configuracion`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ConfigApp[]>(`${this.url}`);
  }

  insert(c: ConfigApp) {
    return this.http.post<ConfigApp>(`${this.url}/nuevo`, c);
  }

  listId(id: number) {
    return this.http.get<ConfigApp>(`${this.url}/${id}`);
  }

  update(c: ConfigApp) {
    return this.http.put(`${this.url}/actualiza`, c, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
