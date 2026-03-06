import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Produto } from '../produtos/model/produto';


@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) { }

  listar(
    page: number,
    size: number,
    sort: string = 'id',
    direction: string = 'asc',
    nome: string = ''
  ): Observable<any> {
    let params = `?page=${page}&size=${size}&sort=${sort},${direction}`;
    if (nome) {
      params += `&nome=${nome}`;
    }
    return this.http.get<any>(`${this.apiUrl}${params}`);
  }
  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }
  pesquisarPorNome(nome: string): Observable<Produto[]> {
    return this.http.get<any>(`${this.apiUrl}?nome=${nome}`).pipe(
      map(resp => resp.content ?? resp)
    );
  }
  uploadImagem(id: number, formData: FormData) {
    return this.http.post(
      `${this.apiUrl}/${id}/imagem`,
      formData
    );
  }
}
