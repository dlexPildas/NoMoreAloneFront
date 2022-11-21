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

  buscarCaronas(): Observable<CaronaModel[]> {
    return this.http.get<CaronaModel[]>(this.BASE_URL);
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

}
