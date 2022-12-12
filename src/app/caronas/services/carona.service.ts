import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaronaModel } from '../models/carona.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaronaService {
  private readonly BASE_URL = "https://localhost:7068/carona";

  constructor(private http: HttpClient) { }

  buscarCaronas(data?: string, origemDestino?: string): Observable<CaronaModel[]> {
    const dateParam = data ? `&data=${data}` : '';

    return this.http.get<CaronaModel[]>(`${this.BASE_URL}/?origemDestino=${origemDestino ?? ''}${dateParam}`);
  }

  buscarCaronasPorUsuario(usuarioId: number): Observable<CaronaModel[]> {
    return this.http.get<CaronaModel[]>(`${this.BASE_URL}/usuario/${usuarioId}`);
  }

  buscarCaronaPorId(id: number): Observable<CaronaModel> {
    return this.http.get<CaronaModel>(`${this.BASE_URL}/${id}`);
  }

  criarCarona(carona: CaronaModel): Observable<boolean> {
    return this.http.post<boolean>(this.BASE_URL, carona);
  }

  deletarCarona(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.BASE_URL}/${id}`, {});
  }

  reservarCarona(idCarona: number, idPassageiro: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.BASE_URL}/${idCarona}/passageiro/${idPassageiro}/reservar`, {});
  }

}
