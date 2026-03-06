import { Produto } from "../../produtos/model/produto";
import { Pedido } from "./pedido";

export interface ItemPedido {
  id?: number;
  pedido?: Pedido;
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
  reservado?: boolean;  // true se já foi baixado/reservado no estoque
}