import { Categoria } from "../../categorias/model/categoria";

export interface Time {
    id?: number;
    nome: string;
    pais: string;
    campeonato: string;
    categoria:Categoria;
}
