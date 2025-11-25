import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {QRResult, RequestDataGo} from '../../components/commons/interfaces/matrix-result.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoApiService {
  private readonly _apiBase = environment.apiBaseGO;
  private readonly _http = inject(HttpClient)

  constructor() {
  }

  sendDataGo(body: RequestDataGo): Observable<QRResult> {
    return this._http.post<QRResult>(this._apiBase + 'factorize', body);
  }
}
