import { Cliente } from "../../clientes/model/cliente";
import { ItemPedido } from "./ItemPedido";
import { PagamentoPedido } from "./PagamentoPedido";


export interface Pedido {
  id?: number;
  cliente: Cliente;
  dataPedido?: string;         // ISO string vinda do backend
  status?: string;             // NOVO | PAGO-PARCIAL | PAGO | ENTREGUE | CANCELADO
  valorTotal?: number;
  valorPago?: number;
  formaPagamento?: string;     // PIX | DINHEIRO | CARTAO | PARCIAL
  encomenda: boolean;          // true = sob demanda
  itens: ItemPedido[];
  pagamentos?: PagamentoPedido[];
}