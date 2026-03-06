import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pais } from '../paises/model/pais';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private apiUrl = `${environment.apiUrl}/pais`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiUrl);
  }
  salvar(cliente: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.apiUrl, cliente);
  }
  atualizar(id: number, cliente: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.apiUrl}/${id}`, cliente);
  }
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  verificarItens(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/possui-itens`);
  }
  buscarPorId(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.apiUrl}/${id}`);
  }

}
