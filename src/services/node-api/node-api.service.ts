import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {QRResult, ResponseDataNode} from '../../components/commons/interfaces/matrix-result.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeApiService {

  private readonly _apiBase = environment.apiBaseNode;
  private readonly _http = inject(HttpClient)

  constructor() {
  }

  sendDataNode(body: QRResult): Observable<ResponseDataNode> {
    return this._http.post<ResponseDataNode>(this._apiBase + 'statistics', body);
  }
}
