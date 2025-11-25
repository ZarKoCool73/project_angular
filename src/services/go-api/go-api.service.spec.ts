import {TestBed} from '@angular/core/testing';

import {GoApiService} from './go-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {QRResult, RequestDataGo} from '../../components/commons/interfaces/matrix-result.interface';
import {environment} from '../../environments/environment';

describe('GoApiService', () => {
  let service: GoApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoApiService]
    });

    service = TestBed.inject(GoApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send data to Go API and return QRResult', () => {
    const requestBody: RequestDataGo = {data: [[1, 2], [3, 4]]};
    const mockResponse: QRResult = {
      matrixQ: [[1, 0], [0, 1]],
      matrixR: [[1, 2], [0, 1]]
    };

    service.sendDataGo(requestBody).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    // Simula la llamada HTTP
    const req = httpMock.expectOne(environment.apiBaseGO + 'factorize');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestBody);

    req.flush(mockResponse); // Devuelve la respuesta simulada
  });

  it('should handle HTTP error', () => {
    const requestBody: RequestDataGo = {data: [[1, 2], [3, 4]]};
    const errorMsg = 'Server error';

    service.sendDataGo(requestBody).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(environment.apiBaseGO + 'factorize');
    expect(req.request.method).toBe('POST');
    req.flush({error: errorMsg}, {status: 500, statusText: 'Server Error'});
  });
});
