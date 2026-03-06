import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../categorias/model/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private apiUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
  salvar(cliente: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, cliente);
  }
  atualizar(id: number, cliente: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, cliente);
  }
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  verificarItens(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/possui-itens`);
  }
  buscarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }


}
