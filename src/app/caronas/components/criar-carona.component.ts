import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiInputCountModule, TuiInputDateModule, TuiInputDateTimeModule, TuiInputModule, TuiInputNumberModule, TuiInputTimeModule } from '@taiga-ui/kit';
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce';

import { CaronaService } from '../services/carona.service';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-carona',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputCountModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiButtonModule,
    TuiInputTimeModule,
    TuiInputDateModule,
    TuiInputNumberModule,
    TuiCurrencyPipeModule
  ],
  template: `
    <div class="tui-container tui-container_adaptive">
      <h3 class="tui-form__header tui-space_top-16">Nova Carona</h3>

      <form class="tui-row tui-row_adaptive " [formGroup]="formulario">
        <div class="tui-col_xs-12 tui-col_md-6 tui-col_lg-6 tui-space_bottom-6">
          <tui-input-date
            tuiUnfinishedValidator="Finish filling the field"
            formControlName="data" >
            Data da carona
          </tui-input-date>
        </div>

        <div class="tui-col_xs-12 tui-col_md-6 tui-col_lg-6 tui-space_bottom-6">

          <tui-input-time
            tuiUnfinishedValidator
            formControlName="hora">
            Hora da carona
          </tui-input-time>
        </div>

        <div class="tui-col_xs-12 tui-col_md-4 tui-col_lg-3 tui-space_bottom-6">
          <tui-input-count
            formControlName="quantidadePessoas"
            [min]="1"
            [max]="200" >
            Quantidade de Pessoas
            <input
              tuiTextfield
              placeholder="1.. 2.. 3.." />
          </tui-input-count>
        </div>

        <div class="tui-col_xs-12 tui-col_md-4 tui-col_lg-3 tui-space_bottom-6">
          <tui-combo-box
            formControlName="tipo">
            Tipo da Carona
            <tui-data-list-wrapper
              *tuiDataList
              [items]="['CARRO', 'Busão']"
            ></tui-data-list-wrapper>
          </tui-combo-box>
        </div>

        <div class="tui-col_xs-12 tui-col_md-4 tui-col_lg-6 tui-space_bottom-6">
          <tui-input-number
            formControlName="preco"
            [prefix]="'RS ' | tuiCurrency" >
            Preço
          </tui-input-number>
        </div>



        <div class="tui-col_xs-12 tui-col_md-12 tui-space_bottom-6">
          <tui-input formControlName="pontoPartida">
            Ponto de Partida
            <input
              tuiTextfield
              type="text" />
          </tui-input>
        </div>

        <div class="tui-col_xs-12 tui-col_md-12 tui-space_bottom-6">
          <tui-input formControlName="pontoChegada">
            Ponto de Chegada
            <input
              tuiTextfield
              type="text" />
          </tui-input>
        </div>

        <div class="tui-col_xs-12 tui-col_md-12">
          <button
            tuiButton
            size="l"
            type="submit"
            class="tui-form__button"
            [disabled]="!formulario.valid"
            (click)="criarNovaCarona()">
              Salvar
          </button>

          <button
            tuiButton
            type="button"
            appearance="flat"
            size="l"
            class="tui-form__button"
            (click)="voltarParaTelaCaronas()">
            Voltar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
  ]
})
export class CriarCaronaComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private caronaService: CaronaService,
    private autenticacaoService: AutenticacaoService,
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.formulario = this.formBuilder.group({
      data: [null, Validators.required],
      hora: [null, Validators.required],
      pontoPartida: ['', Validators.required],
      pontoChegada: ['', Validators.required],
      quantidadePessoas: [1, Validators.required],
      tipo: ['', Validators.required],
      preco: [0, Validators.required]
    });
  }

  criarNovaCarona(): void {
    if(!this.formulario.valid) return;

    const data: TuiDay = this.formulario.get('data')?.value;
    const hora: TuiTime = this.formulario.get('hora')?.value;

    const request = {
      ...this.formulario.value,
      data: new Date(data.year, data.month, data.day, hora.hours, hora.minutes),
      dono: this.autenticacaoService.buscarUsuarioLogado()?.id,
      tipo: 0
    };

    this.caronaService
      .criarCarona(request)
      .subscribe({
        next: () => console.log(''),
        error: () => console.log(''),
        complete: () => console.log(''),
      })
  }

  voltarParaTelaCaronas(): void {
    this.router.navigateByUrl('/caronas');
  }
}
