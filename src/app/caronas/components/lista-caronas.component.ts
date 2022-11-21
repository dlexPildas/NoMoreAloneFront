import { FormGroup, Validators, FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutenticacaoService } from './../../shared/services/autenticacao.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCaronasComponent } from './card-caronas.component';
import { BotaoFlutuanteComponent } from 'src/app/shared/components/botao-flutuante.component';
import { CaronaService } from '../services/carona.service';
import { CaronaModel } from '../models/carona.model';
import { Observable } from 'rxjs';
import { TuiCheckboxBlockModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-lista-caronas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CardCaronasComponent, BotaoFlutuanteComponent, TuiCheckboxBlockModule],
  template: `
    <div class="tui-container tui-container_adaptive">
      <div class="tui-row tui-row_adaptive tui-space_top-6 ">
        <div class="tui-col_xs-12 tui-col_md-12 tui-col_lg-12 alinhar-direita">
          <tui-checkbox-block
            #checkBoxApenasMinhasCaronas
            [formControl]="filtroApenasMinhasCaronas"

            contentAlign="right"
            size="m"
            *ngIf="usuarioEstaLogado$ | async">
            Apenas minhas caronas
          </tui-checkbox-block>
        </div>
      </div>

      <div class="tui-row tui-row_adaptive tui-space_top-6 ">
        <div *ngFor="let carona of caronas$ | async" class="tui-col_xs-12 tui-col_md-6 tui-col_lg-4 tui-space_top-3 tui-space_bottom-3">
          <app-card-caronas [carona]="carona" ></app-card-caronas>
        </div>
      </div>
    </div>

    <app-botao-flutuante *ngIf="usuarioEstaLogado$ | async" (wasClicked)="navigate('carona/new')"></app-botao-flutuante>
  `,
  styles: [
  ]
})
export class ListaCaronasComponent implements OnInit {
  caronas$!: Observable<CaronaModel[]>;
  usuarioEstaLogado$!: Observable<boolean>;
  filtroApenasMinhasCaronas = new FormControl(false);

  constructor(
    private router: Router,
    private caronaService: CaronaService,
    private autenticacaoService: AutenticacaoService,
  ) {}

  ngOnInit(): void {
    this.buscarCaronas();
    this.usuarioEstaLogado$ = this.autenticacaoService.usuarioLogado$;
    this.filtroApenasMinhasCaronas.valueChanges
      .subscribe(value => {
        if (value && this.autenticacaoService.usarioEstaLogado()) {
          this.caronas$ = this.caronaService
            .buscarCaronasPorUsuario(this.autenticacaoService.buscarUsuarioLogado()?.id ?? 0);
            return;
        }
        this.caronas$ = this.caronaService.buscarCaronas();
      })
  }

  buscarCaronas(): void {
    this.caronas$ = this.caronaService.buscarCaronas();
  }

  teste(value: any) {
    console.log('testeeeee --- '+value)
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }
}
