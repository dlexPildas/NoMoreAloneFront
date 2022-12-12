import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCheckboxBlockModule, TuiInputDateModule, TuiInputModule } from '@taiga-ui/kit';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';


@Component({
  selector: 'app-filtro-pesquisa-carona',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputDateModule,
    TuiCheckboxBlockModule,
    TuiButtonModule,
    TuiInputModule
  ],
  template: `
    <form [formGroup]="formulario" (ngSubmit)="pesquisar()" class="tui-row tui-row_adaptive tui-space_top-16">
      <div class="tui-col_xs-12 tui-col_md-6 tui-col_lg-3 tui-space_bottom-6">
        <tui-input-date
          tuiUnfinishedValidator="Finish filling the field"
          toNativeDate
          formControlName="data" >
          Data da carona
        </tui-input-date>
      </div>

      <div class="tui-col_xs-12 tui-col_md-6 tui-col_lg-4 tui-space_bottom-6">
        <tui-input formControlName="origemDestino">
          Destino/Origem
          <input
            tuiTextfield
            type="text" />
        </tui-input>
      </div>

      <div class="tui-col_xs-12 tui-col_md-3 tui-col_lg-3 tui-space_bottom-6 alinhar-direita">
        <tui-checkbox-block
        #checkBoxApenasMinhasCaronas
        formControlName="apenasMinhasCaronas"
        contentAlign="right"
        size="m"
        *ngIf="usuarioEstaLogado$ | async">
          Apenas minhas caronas
        </tui-checkbox-block>
      </div>

      <div class="tui-col_xs-12 tui-col_md-3 tui-col_lg-2 tui-space_bottom-6 alinhar-direita">
        <button
          tuiButton
          type="submit"
          appearance="primary"
          class="tui-space_right-3 tui-space_bottom-3">
          Pesquisar
        </button>
      </div>


    </form>
  `,
  styles: [
  ]
})
export class FiltroPesquisaCaronaComponent implements OnInit {
  @Input() usuarioEstaLogado$!: Observable<boolean>;

  @Output() pesquisarCaronas = new EventEmitter<FormGroup>();

  formulario!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.formulario = this.formBuilder.group({
      origemDestino: [],
      data: [],
      apenasMinhasCaronas: [false],
    })
  }

  pesquisar(): void {
    this.pesquisarCaronas.emit(this.formulario);
  }
}
