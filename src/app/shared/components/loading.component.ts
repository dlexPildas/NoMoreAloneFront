import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading" *ngIf="loading">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 512 512"
        size="100"
        color="#3333"
        height="100"
        width="100"
        xmlns="http://www.w3.org/2000/svg"
        style="color: linear-gradient( #654ea3, #eaafc8)">
        <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48
          48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48
          48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48
          48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0
          229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49
          48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48
          48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48
          21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
        </path>
      </svg>
      <!-- <label>Carregando...</label> -->
    </div>
  `,
  styles: [
    `
      .loading {
        position: absolute;
        z-index: 2;
        /* background: rgb(0, 0, 0, .09); */
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: rgba(238, 238, 238, 0.3);
      }

      .loading label {
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        letter-spacing: 1.4px;
        color: #526ed3;
        padding: 5px 10px;
      }

      svg {
        animation: rotate 1.5s linear infinite;
        color: #526ed3;
        margin-bottom: 10px;
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `
  ]
})
export class LoadingComponent {
  @Input() loading = false;
}
