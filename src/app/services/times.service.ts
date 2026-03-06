import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Time } from '../times/model/time';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimesService {
  private apiUrl = `${environment.apiUrl}/times`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Time[]> {
    return this.http.get<Time[]>(this.apiUrl);
  }

  salvar(time: Time): Observable<Time> {
    return this.http.post<Time>(this.apiUrl, time);
  }

  atualizar(id: number, time: Time): Observable<Time> {
    return this.http.put<Time>(`${this.apiUrl}/${id}`, time);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  buscarPorId(id: number): Observable<Time> {
    return this.http.get<Time>(`${this.apiUrl}/${id}`);
  }

}
