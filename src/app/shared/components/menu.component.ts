import { Observable, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../services/state.service';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header *ngIf="!(esconderMenu$ | async)">
      <img (click)="navigate('')" src="https://img.freepik.com/vetores-gratis/casal-de-turistas-felizes-com-mochilas-e-coisas-de-acampamento-pegando-carona-na-estrada-e-segurando-um-carro-amarelo_74855-14043.jpg?w=2000" alt="logo">

      <nav>
        <li (click)="navigate('caronas')">Caronas</li>
        <li (click)="navigate('caronas')">Sobre</li>
        <li *ngIf="(usuarioEstaLogado$ | async) == false" (click)="navigate('login')">Entrar</li>
        <li *ngIf="usuarioEstaLogado$ | async" (click)="sair()">Sair</li>
      </nav>
    </header>
  `,
  styles: [`
    header {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 15px 0;
    }

    header img {
      width: 15rem;
      border-radius: 15px;
      cursor: pointer;
    }

    header nav {
      display: flex;

    }

    header nav li {
      list-style: none;
      font-size: 1.2rem;
      font-weight: bold;
      color: #18aff5;
      cursor: pointer;
      border-bottom: solid 4px #18aff5;
      margin-right: 3rem
    }

    @media  (max-width: 600px) {
      header nav {
        flex-direction: column;
      }

      header nav li {
        margin-bottom: 8px;
      }

      header img {
        width: 8rem;
      }
    }
  `]
})
export class MenuComponent implements OnInit {
  esconderMenu$!: Observable<boolean>;
  usuarioEstaLogado$!: Observable<boolean>;

  constructor(
    private router: Router,
    private state: StateService,
    private autenticacaoService: AutenticacaoService,
  ) {}

  ngOnInit(): void {
    this.esconderMenu$ = this.state.esconderMenu$;
    this.usuarioEstaLogado$ = this.autenticacaoService.usuarioLogado$;
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

  sair(): void {
    this.autenticacaoService.sairAutenticacao();
    this.navigate('caronas');
  }
}
