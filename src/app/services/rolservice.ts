import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environment.development/environment.development'; 
import { Rol } from '../models/rol';
import { Subject, Observable } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})

export class Rolservice {
    private url = `${environment.base}/rol`;
    private listaCambio = new Subject<Rol[]>();
    constructor(private http: HttpClient) { }


  list(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.url);
  }

  listId(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

>>>>>>> origin/develop
  insert(r: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.url}/nuevo`, r);
  }
  update(r: Rol): Observable<any> {
    return this.http.put(`${this.url}/actualiza`, r, { responseType: 'text' });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  // MÉTODOS REACTIVOS (Para refrescar componentes)
  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Rol[]> {
    return this.listaCambio.asObservable();
  }

}

