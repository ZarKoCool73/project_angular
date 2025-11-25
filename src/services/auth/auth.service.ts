import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = 'http://localhost:4000'; // URL de tu API de login
  constructor() {
  }


  login(username: string, password: string): Observable<any> {
    return this._http.post<{ token: string }>(`${this._baseUrl}/auth/login`, {username, password})
  }

}
