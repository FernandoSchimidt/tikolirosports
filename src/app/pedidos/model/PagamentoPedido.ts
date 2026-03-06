import { Pedido } from "./pedido";

export interface PagamentoPedido {
  id?: number;
  pedido?: Pedido;
  dataPagamento?: string;   // ISO string
  valor: number;
  forma: string;            // PIX | DINHEIRO | CARTAO
  observacao?: string;
}