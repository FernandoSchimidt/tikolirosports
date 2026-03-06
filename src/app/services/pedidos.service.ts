import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../pedidos/model/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) { }

  /** Lista todos os pedidos */
  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  /** Busca um pedido específico */
  getPedidoById(id: number) {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }
  //**Buscar pedidos por data */

  /** Cria um novo pedido */
  criar(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  /** Registra um pagamento (parcial ou total) de um pedido */
  registrarPagamento(pedidoId: number, pagamento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${pedidoId}/pagamentos`, pagamento);
  }

  /** Marca o pedido como entregue e baixa estoque */
  entregar(pedidoId: number): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/${pedidoId}/entregar`, {});
  }
  /** Buscar pedidos por período e cliente */
  filtrarPedidos(datIni?: Date, datFim?: Date, clienteId?: number): Observable<Pedido[]> {

    let params: string[] = [];

    if (datIni) {
      params.push(`inicio=${datIni.toISOString().split('T')[0]}`);
    }

    if (datFim) {
      params.push(`fim=${datFim.toISOString().split('T')[0]}`);
    }

    if (clienteId) {
      params.push(`clienteId=${clienteId}`);
    }

    const query = params.length ? `?${params.join('&')}` : '';

    return this.http.get<Pedido[]>(`${this.apiUrl}/periodo${query}`);
  }
}
