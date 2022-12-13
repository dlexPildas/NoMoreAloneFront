import { AlertService } from 'src/app/shared/services/alert.service';
import { UserModel } from './../../usuarios/models/user.model';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule, TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLabelModule } from '@taiga-ui/core';
import { CaronaModel } from '../models/carona.model';
import { CaronaService } from '../services/carona.service';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';

@Component({
  selector: 'app-card-caronas',
  standalone: true,
  imports: [CommonModule, TuiIslandModule, TuiLabelModule, TuiAvatarModule, TuiButtonModule],
  template: `
    <tui-island class="card-container">
      <section class="tui-space_bottom-2 corpo-card">
        <span>
          <label tuiLabel="Origem">{{carona.pontoChegada}}</label>
          <label tuiLabel="Destino">{{carona.pontoPartida}}</label>
        </span>

        <strong>
          R$ {{carona.preco}}
          <button tuiButton size="xs" (click)="reservarCarona()" *ngIf="carona.dono != usuarioAtual?.id"> Reservar</button>
        </strong>
      </section>

      <footer>
        <div class="info">
          <span class="dono">
            <tui-avatar
              text="dmitry demensky"
              size="m"
              class="tui-space_top-1 tui-space_right-2"
              [rounded]="true" >
            </tui-avatar>

            <h4>{{carona.nomeDonoCarona}}</h4>
          </span>

          <h3 class="data-carona">{{carona.data | date:'dd/MM/yyyy'}} <small>{{carona.data | date:'HH:mm'}}</small> </h3>
        </div>

        <button
          (click)="navegarParaDetalhesCarona(carona.id)"
          style="width: 100%;"
          tuiButton size="s"
          appearance="secondary-destructive">Ver Detalhes</button>
      </footer>

    </tui-island>
  `,
  styles: [
    `
      header {
        display: flex;
        justify-content: space-between;
      }

      footer .info {
        display: flex;
        align-items: center;
        justify-content: space-between;

      }

      footer .info  .dono {
        display: flex;
        align-items: center;
      }

      .card-container {
        position: relative;
      }

      .card-container .passageiros {
        position: absolute;
        top: -20px;
        left: 15px;
      }

      .corpo-card {
        display: flex;
        justify-content: space-between;
      }

      .corpo-card strong {
        color: #054752;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--tui-positive-night-hover);
        font-size: 18px
      }

      .corpo-card .preco-reservar {

      }

      .data-carona {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #054752
      }
    `
  ]
})
export class CardCaronasComponent implements OnInit{
  @Input() carona!: CaronaModel;

  usuarioAtual!: UserModel | null;

  constructor(
    private router: Router,
    private caronaService: CaronaService,
    private autenticacaoService: AutenticacaoService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.usuarioAtual = this.autenticacaoService.buscarUsuarioLogado();
  }

  reservarCarona(): void {
    if (this.usuarioAtual == null) {
      this.alertService.mostrarMensagemInformacao("Para reservar uma carona, é necessário realizar o login");
      this.router.navigateByUrl('/login');
      return;
    };

    this.caronaService
      .reservarCarona(this.carona.id, this.usuarioAtual.id)
      .subscribe({
        next: () => this.alertService.mostrarMensagemSucesso('Carona foi reservado com sucesso :)'),
        error: error => this.alertService.mostrarMensagemError(error?.error?.error),
        complete: () => console.log('Complete'),
      })
  }

  navegarParaDetalhesCarona(caronaId: number): void {
    this.router.navigateByUrl(`carona/${caronaId}/detalhe`);
  }

}
