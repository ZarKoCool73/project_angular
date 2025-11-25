import {Component, inject} from '@angular/core';
import {GoApiService} from '../../services/go-api/go-api.service';
import {NodeApiService} from '../../services/node-api/node-api.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgIf} from '@angular/common';
import {QRResult, RequestDataGo, ResponseDataNode} from '../commons/interfaces/matrix-result.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-matrix-result',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    DatePipe,
  ],
  templateUrl: './matrix-result.component.html',
  styleUrl: './matrix-result.component.scss'
})
export class MatrixResultComponent {

  matrixStr!: string;
  errorMsg!: string;
  isError: boolean = false
  responseData!: ResponseDataNode;
  isLoading = false;
  private readonly goApi = inject(GoApiService);
  private readonly nodeApi = inject(NodeApiService);

  submitMatrix() {
    this.isLoading = true;
    const cleaned = this.matrixStr
      .replaceAll(/\s+/g, '')  // elimina espacios y saltos de línea
      .replaceAll(',]', ']'); // corrige errores comunes

    let parsedMatrix;
    try {
      parsedMatrix = JSON.parse(cleaned);
      this.sendDataGo(parsedMatrix);
    } catch (e) {
      this.isError = true;
      this.isLoading = false;
      this.errorMsg = 'Error: la matriz ingresada no es válida';
      console.error('Error al procesar la matriz:', e);
    }
  }

  sendDataGo(body: RequestDataGo) {
    this.goApi.sendDataGo(body).subscribe({
      next: (res) => {
        this.isError = false
        this.sendDataNode(res)
      },
      error: (err: HttpErrorResponse) => {
        this.isError = true
        this.errorMsg = err.error?.error || 'Error en el servidor';
      }
    });
  }

  sendDataNode(body: QRResult) {
    this.nodeApi.sendDataNode(body).subscribe({
      next: (res) => {
        this.responseData = res;
        this.isError = false;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isError = true
        this.isLoading = false;
        this.errorMsg = err.error?.error || 'Error en el servidor';
      }
    });
  }

}
