import { Produto } from './produto.model';

export class Estoque {
  data: Date;
  produto: Produto;
  tipoMovimento: string;
  documento: string;
  motivo: string;
  saldo: number;
}
