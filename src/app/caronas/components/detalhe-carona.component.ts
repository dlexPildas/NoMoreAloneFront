import { AlertService } from 'src/app/shared/services/alert.service';
import { UserModel } from './../../usuarios/models/user.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TuiAvatarModule, TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiHintModule, TuiLabelModule, TuiLinkModule, TuiTooltipModule } from '@taiga-ui/core';

import { CaronaModel } from './../models/carona.model';
import { CaronaService } from './../services/carona.service';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';

@Component({
  selector: 'app-detalhe-carona',
  standalone: true,
  imports: [CommonModule, RouterModule, TuiIslandModule, TuiLabelModule, TuiAvatarModule, TuiLinkModule, TuiButtonModule, TuiTooltipModule, TuiHintModule],
  template: `
    <tui-island class="card-container">

      <h3 class="tui-island__title">
        <a
          tuiLink
          [routerLink]="['/caronas']"
          icon="tuiIconArrowLeftLarge"
          iconAlign="left"
          class="tui-space_bottom-6"
          >
        </a>

        Informações gerais
      </h3>

      <div class="tui-row tui-row_adaptive">
        <div class="tui-col_xs-12 tui-col_md-4 tui-space_bottom-6">
          <label tuiLabel="Origem">
            <strong>{{carona?.pontoPartida}}</strong>
          </label>
        </div>

        <div class="tui-col_xs-12 tui-col_md-4 tui-space_bottom-6">
          <label tuiLabel="Destino">
            <strong>{{carona?.pontoChegada}}</strong>
          </label>
        </div>

        <div class="tui-col_xs-12 tui-col_md-4 tui-space_bottom-6">
          <label tuiLabel="Data">
            <strong>{{carona?.data | date:"dd/MM/yyyy HH:mm"}}</strong>
          </label>
        </div>
      </div>

      <div class="tui-row tui-row_adaptive">
        <div class="tui-col_xs-12 tui-col_md-4 tui-space_bottom-6">
          <label tuiLabel="Tipo">
            <strong>{{carona?.tipo}}</strong>
          </label>
        </div>

        <div class="tui-col_xs-12 tui-col_md-4 tui-space_bottom-6">
          <label tuiLabel="Quantidade de pessoas">
            <strong>{{carona?.quantidadePessoas}}</strong>
          </label>
        </div>

        <div class="tui-col_xs-12 tui-col_md-4 tui-space_bottom-12">
          <label tuiLabel="Preço">
            <strong class="preco">R$ {{carona?.preco}}</strong>
          </label>
        </div>
      </div>

      <h3 class="tui-island__title ">Passageiros</h3>

      <div class="tui-row tui-row_adaptive" *ngFor="let passageiro of carona?.passageiros">
        <div class="tui-col_xs-6 tui-col_md-4 tui-space_bottom-6">
          <span class="container-passageiro">
            <tui-avatar
              text="dmitry demensky"
              size="m"
              class="tui-space_top-1 tui-space_right-2"
              [rounded]="true" >
            </tui-avatar>

            <span class="info-passageiro">
              <strong>{{passageiro.nome}}</strong>
            </span>
          </span>
        </div>

        <div class="tui-col_xs-3 tui-col_md-3 tui-space_bottom-6">
          <label tuiLabel="Matrícula">
            <strong>{{passageiro.matricula}}</strong>
          </label>
        </div>

        <div class="tui-col_xs-3 tui-col_md-3 tui-space_bottom-6">
          <label tuiLabel="Semestre">
            <strong>{{passageiro.semestre}}</strong>
          </label>
        </div>

        <div class="tui-col_xs-3 tui-col_md-2 tui-space_bottom-6" *ngIf="passageiro.id === usuarioLogado?.id">
          <button
            tuiIconButton
            appearance="accent"
            type="button"
            [icon]="'tuiIconTrash'"
            tuiHintDirection="right"
            [tuiHint]="tooltip"
            (click)="cancelarReserva(passageiro.id, carona!.id)" >
          </button>
        </div>
      </div>
    </tui-island>

    <ng-template #tooltip>Cancelar Reserva</ng-template>

  `,
  styles: [
    `
      .card-container {
        max-width: 800px;
        margin: 20px auto;
      }

      .preco {
        color: var(--tui-positive-night-hover);
        font-size: 24px
      }

      .container-passageiro {
        display: flex;
        align-items: center;
      }

      .container-passageiro .info-passageiro {
        display: flex;
        flex-direction: column;
      }
    `
  ]
})
export class DetalheCaronaComponent implements OnInit {
  carona!: CaronaModel | null;
  usuarioLogado!: UserModel | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private caronaService: CaronaService,
    private autenticacaoService: AutenticacaoService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.buscarDetalhesDaCarona(+id);

    this.usuarioLogado = this.autenticacaoService.buscarUsuarioLogado();
  }

  buscarDetalhesDaCarona(idCarona: number): void {
    this.caronaService
      .buscarCaronaPorId(idCarona)
      .subscribe({
        next: carona => this.carona = carona
      });
  }

  cancelarReserva(idPassageiro: number, idCarona: number): void {
    if(idPassageiro !== this.usuarioLogado?.id)
      return this.alertService.mostrarMensagemError("HaHaHa espertinho!!! Na na nina não 😂");

    this.caronaService.cancelarReservaCarona(idCarona, idPassageiro)
      .subscribe({
        next: () => {
          this.alertService.mostrarMensagemSucesso("Reserva cancelada com sucesso");
          this.buscarDetalhesDaCarona(idCarona);
        },
        error: error => this.alertService.mostrarMensagemError(error?.error?.error)
      })
  }
}
