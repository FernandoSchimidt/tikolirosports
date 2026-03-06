import { Produto } from "../../produtos/model/produto";

export interface Estoque {
    "tipo": string,
    "quantidade": number,
    "descricao": string,
    "produto": Produto;
}
