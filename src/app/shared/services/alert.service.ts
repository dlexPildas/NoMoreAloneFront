import { Inject, Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    @Inject(TuiAlertService)
    private readonly alertTuiService: TuiAlertService,
  ) { }


  mostrarMensagemError(mensagem: string): void {
    this.alertTuiService.open(mensagem, {
      status: TuiNotification.Error
    }).subscribe();
  }

  mostrarMensagemSucesso(mensagem: string): void {
    this.alertTuiService.open(mensagem ?? 'Um error inesperado ocorreu', {
      status: TuiNotification.Success
    }).subscribe();
  }

  mostrarMensagemInformacao(mensagem: string): void {
    this.alertTuiService.open(mensagem ?? '', {
      status: TuiNotification.Info
    }).subscribe();
  }
}
