import { Time } from "../../times/model/time"

export interface Cliente {
    id: number,
    nome: string,
    telefone: string,
    email: string,
    timeFavorito: Time,
    observacao: string

}
