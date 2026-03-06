import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estoque } from '../estoque/model/estoque';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private apiUrl = `${environment.apiUrl}/estoque`;

  constructor(private http: HttpClient) { }

  movimentar(movimento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/movimentar`, movimento);
  }

  listarPorProduto(id: number): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(`${environment.apiUrl}/produto/${id}`);
  }
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
