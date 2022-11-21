import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin, UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly BASE_URL = "https://localhost:7068/user";

  constructor(private http: HttpClient) { }

  login(userLogin: UserLogin): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.BASE_URL}/login`, userLogin);
  }
}
