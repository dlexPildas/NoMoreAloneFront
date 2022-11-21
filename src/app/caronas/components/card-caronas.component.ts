import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule, TuiIslandModule } from '@taiga-ui/kit';
import { TuiLabelModule } from '@taiga-ui/core';
import { CaronaModel } from '../models/carona.model';

@Component({
  selector: 'app-card-caronas',
  standalone: true,
  imports: [CommonModule, TuiIslandModule, TuiLabelModule, TuiAvatarModule],
  template: `
    <tui-island>
      <section class="tui-space_bottom-2 corpo-card">
        <span>
          <label tuiLabel="Origem">{{carona.pontoChegada}}</label>
          <label tuiLabel="Destino">{{carona.pontoPartida}}</label>
        </span>

        <strong class="">
          R$ 00,00
        </strong>
      </section>

      <footer>

        <div class="dono">
          <tui-avatar
            text="dmitry demensky"
            size="m"
            class="tui-space_top-1 tui-space_right-2"
            [rounded]="true" >
          </tui-avatar>

          <h4>Daniel</h4>
        </div>

        <h3 class="data-carona">{{carona.data | date:'dd/MM/yyyy'}} <small>{{carona.data | date:'HH:mm'}}</small> </h3>
      </footer>
    </tui-island>
  `,
  styles: [
    `
      header {
        display: flex;
        justify-content: space-between;
      }

      footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      footer .dono {
        display: flex;
        align-items: center;
      }

      .corpo-card {
        display: flex;
        justify-content: space-between;
      }

      .corpo-card strong {
        color: #054752
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
export class CardCaronasComponent {
  @Input() carona!: CaronaModel;


  data = new Date();
}
