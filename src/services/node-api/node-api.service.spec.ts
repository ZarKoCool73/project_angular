import {TestBed} from '@angular/core/testing';

import {NodeApiService} from './node-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DataResponse, QRResult, ResponseDataNode} from '../../components/commons/interfaces/matrix-result.interface';
import {environment} from '../../environments/environment';

describe('NodeApiService', () => {
  let service: NodeApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NodeApiService]
    });

    service = TestBed.inject(NodeApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send QRResult and return ResponseDataNode', () => {
    const qrResult: QRResult = {matrixQ: [[1, 0], [0, 1]], matrixR: [[1, 2], [0, 1]]};

    const mockDataResponse: DataResponse = {
      statistics: {
        basic: {max: 10, min: 1, sum: 55, average: 5.5, count: 10},
        advanced: {median: 5, variance: 2, standardDeviation: Math.sqrt(2)}
      },
      matrixAnalysis: {
        matrixQ: {name: 'Q', dimensions: '2x2', isSquare: true, isDiagonal: false, isUpperTriangular: false},
        matrixR: {name: 'R', dimensions: '2x2', isSquare: true, isDiagonal: true, isUpperTriangular: true},
        validations: {qIsOrthogonal: true, rIsUpperTriangular: true}
      },
      timestamp: '2025-11-24T00:00:00Z'
    };

    const mockResponse: ResponseDataNode = {
      success: true,
      message: 'ok',
      data: mockDataResponse,
      timestamp: '2025-11-24T00:00:00Z'
    };

    service.sendDataNode(qrResult).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiBaseNode + 'statistics');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(qrResult);

    req.flush(mockResponse); // Simula la respuesta del servidor
  });

  it('should handle HTTP error', () => {
    const qrResult: QRResult = {matrixQ: [[1, 0], [0, 1]], matrixR: [[1, 2], [0, 1]]};

    service.sendDataNode(qrResult).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(environment.apiBaseNode + 'statistics');
    expect(req.request.method).toBe('POST');
    req.flush({error: 'Server error'}, {status: 500, statusText: 'Server Error'});
  });
});
