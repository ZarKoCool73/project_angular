import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MatrixResultComponent} from './matrix-result.component';
import {GoApiService} from '../../services/go-api/go-api.service';
import {NodeApiService} from '../../services/node-api/node-api.service';
import {DatePipe} from '@angular/common';
import {of, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {DataResponse, RequestDataGo, ResponseDataNode} from '../commons/interfaces/matrix-result.interface';

describe('MatrixResultComponent', () => {
  let component: MatrixResultComponent;
  let fixture: ComponentFixture<MatrixResultComponent>;
  let goApiMock: any;
  let nodeApiMock: any;

  beforeEach(async () => {
    goApiMock = {sendDataGo: jasmine.createSpy()};
    nodeApiMock = {sendDataNode: jasmine.createSpy()};

    await TestBed.configureTestingModule({
      imports: [MatrixResultComponent],
      providers: [
        {provide: GoApiService, useValue: goApiMock},
        {provide: NodeApiService, useValue: nodeApiMock},
        DatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MatrixResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitMatrix', () => {

    it('should set isError true for invalid matrix', () => {
      component.matrixStr = '[[1,2],[3,4]'; // JSON inválido

      spyOn(console, 'error');

      component.submitMatrix();

      expect(component.isError).toBeTrue();
      expect(component.errorMsg).toBe('Error: la matriz ingresada no es válida');
      expect(console.error).toHaveBeenCalled();
    });

  });

  describe('sendDataGo', () => {
    const body = {data: [[1, 2], [3, 4]]};

    it('should handle success and call sendDataNode', fakeAsync(() => {
      const res = {matrixQ: [[1]], matrixR: [[2]]};
      goApiMock.sendDataGo.and.returnValue(of(res));
      spyOn(component, 'sendDataNode');

      component.sendDataGo(body);
      tick();

      expect(component.isError).toBeFalse();
      expect(component.sendDataNode).toHaveBeenCalledWith(res);
    }));

    it('should handle error from GoApiService', fakeAsync(() => {
      const errorResponse = new HttpErrorResponse({error: {error: 'Go API error'}, status: 500});
      goApiMock.sendDataGo.and.returnValue(throwError(() => errorResponse));

      component.sendDataGo(body);
      tick();

      expect(component.isError).toBeTrue();
      expect(component.errorMsg).toBe('Go API error');
    }));
  });

  describe('sendDataNode', () => {
    const qrResult = {matrixQ: [[1]], matrixR: [[2]]};

    it('should handle success', fakeAsync(() => {
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

      const response: ResponseDataNode = {
        success: true,
        message: 'ok',
        data: mockDataResponse,
        timestamp: '2025-11-24T00:00:00Z'
      };

      nodeApiMock.sendDataNode.and.returnValue(of(response));

      const qrResult = {matrixQ: [[1]], matrixR: [[2]]}; // entrada simulada

      component.sendDataNode(qrResult);
      tick();

      expect(component.isError).toBeFalse();
      expect(component.responseData).toEqual(response);
    }));

    it('should handle error from NodeApiService', fakeAsync(() => {
      const errorResponse = new HttpErrorResponse({error: {error: 'Node API error'}, status: 500});
      nodeApiMock.sendDataNode.and.returnValue(throwError(() => errorResponse));

      component.sendDataNode(qrResult);
      tick();

      expect(component.isError).toBeTrue();
      expect(component.errorMsg).toBe('Node API error');
    }));
  });

});
