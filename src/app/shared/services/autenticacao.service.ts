import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserModel } from 'src/app/usuarios/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  usuarioLogado$ = new BehaviorSubject<boolean>(this.usarioEstaLogado());

  constructor() { }

  adicionarUsuarioLogado(user: UserModel): void {
    localStorage.setItem('nomeMoreApiLogin', JSON.stringify(user));
    this.usuarioLogado$.next(true);
  }

  buscarUsuarioLogado(): UserModel | null {
    const user = localStorage.getItem('nomeMoreApiLogin');

    if (!user) return null;

    return JSON.parse(user);
  }

  usarioEstaLogado(): boolean {
    return localStorage.getItem('nomeMoreApiLogin') != null;
  }

  sairAutenticacao(): void {
    localStorage.removeItem('nomeMoreApiLogin');
    this.usuarioLogado$.next(false);
  }
}
