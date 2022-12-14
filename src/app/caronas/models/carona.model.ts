import { UserModel } from './../../usuarios/models/user.model';
export interface CaronaModel {
  id: number;
  data: string;
  pontoPartida: string;
  pontoChegada: string;
  quantidadePessoas: number;
  tipo: string;
  dono: number;
  nomeDonoCarona: string;
  preco: number;
  passageiros: UserModel[];
}
