export interface Produto {
  id?: number;
  nome: string;
  time: string;
  anoLancamento: number;
  tamanho: string;
  modelo: string;
  precoCusto: number;
  precoVenda: number;
  estoqueAtual: number;
  estoqueMinimo: number;
  imagemUrl?: string;
  categoria: {
    id: number;
    nome?: string;
  };
}
