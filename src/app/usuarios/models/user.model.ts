export interface UserModel {
  id: number;
  nome: string;
  matricula: number;
  telefone: string;
  semestre: string;
  curso: string;
  senha: string;
}

export interface UserLogin {
  matricula: number;
  senha: string;
}
