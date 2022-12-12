import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';
import { StateService } from '../../shared/services/state.service';
import { UsuarioService } from '../services/usuario.service';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiInputModule,
    TuiButtonModule,
    TuiLinkModule
  ],
  template: `
    <div class="container-login">
      <form [formGroup]="formulario" class="tui-row tui-row_adaptive formulario">
        <div class="tui-col_xs-12 tui-col_md-12 tui-space_bottom-6 alinhar-centro">
          <img (click)="navegarParaCaronas()" src="https://img.freepik.com/vetores-gratis/casal-de-turistas-felizes-com-mochilas-e-coisas-de-acampamento-pegando-carona-na-estrada-e-segurando-um-carro-amarelo_74855-14043.jpg?w=2000" alt="logo">
        </div>

        <div class="tui-col_xs-12 tui-col_md-12 tui-space_bottom-6">
          <tui-input formControlName="matricula">
            Matrícula
            <input tuiTextfield />
          </tui-input>
        </div>

        <div class="tui-col_xs-12 tui-col_md-12 tui-space_bottom-6">
          <tui-input-password
            formControlName="senha"
            tuiHintDirection="right"
            tuiHintAppearance="onDark" >
            Senha
          </tui-input-password>
        </div>

        <div class="tui-col_xs-12 tui-col_md-12 alinhar-direita">
          <button
            tuiButton
            type="button"
            appearance="primary"
            [style.width.%]="100"
            [disabled]="!formulario.valid"
            class=" tui-space_bottom-3"
            (click)="login()">
            Login
          </button>
        </div>

        <div class="tui-col_xs-12 tui-col_md-12 alinhar-direita">
          <button
            tuiButton
            type="button"
            appearance="outline"
            [style.width.%]="100"
            class="" >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container-login {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .container-login .formulario {
      max-width: 600px;
      margin: 0 auto;
    }

    .container-login .formulario img {
      width: 90%;
      border-radius: 100px;
      cursor: pointer;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private state: StateService,
    private usuarioService: UsuarioService,
    private autenticacaoService: AutenticacaoService,
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
    this.state.esconderMenu$.next(true);
  }

  ngOnDestroy(): void {
    this.state.esconderMenu$.next(false);
  }

  criarFormulario(): void {
    this.formulario = this.formBuilder.group({
      matricula: [3017214, Validators.required],
      senha: ['teste123', Validators.required]
    });
  }

  login(): void {
    if(!this.formulario.valid) return;

    this.usuarioService
      .login(this.formulario.value)
      .subscribe({
        next: user => {
          this.autenticacaoService.adicionarUsuarioLogado(user);
          this.navegarParaCaronas();
        },
        error: () => console.log(''),
        complete: () => console.log(''),
      })
  }

  navegarParaCaronas(): void {
    this.router.navigateByUrl('caronas');
  }
}
