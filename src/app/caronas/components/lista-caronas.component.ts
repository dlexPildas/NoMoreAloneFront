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
import { FiltroPesquisaCaronaComponent } from './filtro-pesquisa-carona.component';

@Component({
  selector: 'app-lista-caronas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardCaronasComponent,
    BotaoFlutuanteComponent,
    TuiCheckboxBlockModule,
    FiltroPesquisaCaronaComponent
  ],
  template: `
    <div class="tui-container tui-container_adaptive">
      <app-filtro-pesquisa-carona [usuarioEstaLogado$]="usuarioEstaLogado$" (pesquisarCaronas)="buscarCaronas($event)"></app-filtro-pesquisa-carona>

      <div class="tui-row tui-row_adaptive tui-space_top-6 ">
        <div *ngFor="let carona of caronas$ | async" class="tui-col_xs-12 tui-col_md-6 tui-col_lg-4 tui-space_top-6 tui-space_bottom-6">
          <app-card-caronas [carona]="carona"></app-card-caronas>
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
  }

  buscarCaronas(form?: FormGroup): void {
    if(form) {
      let {data, origemDestino} = form.value;
      data = data ? `${data.year}-${data.month + 1}-${data.day}` : '';

      this.caronas$ = this.caronaService.buscarCaronas(data, origemDestino);
      return;
    }
    this.caronas$ = this.caronaService.buscarCaronas();
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }
}
