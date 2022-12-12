import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-botao-flutuante',
  standalone: true,
  imports: [CommonModule, TuiButtonModule],
  template: `
    <button
      tuiButton
      type="button"
      class="tui-space_right-3 tui-space_bottom-3 flutuante"
      [icon]="'tuiIconPlus'"
      appearance="accent"
      (click)="click()">
      Oferecer Carona
    </button>
  `,
  styles: [
    `
      .flutuante {
        position: fixed;
        bottom: 15px;
        right: 15px
      }
    `
  ]
})
export class BotaoFlutuanteComponent {
  @Output() wasClicked = new EventEmitter();


  click(): void {
    this.wasClicked.emit();
  }
}
