import {Component, inject} from '@angular/core';
import {Card} from 'primeng/card';
import {GoApiService} from '../../services/go-api/go-api.service';
import {NodeApiService} from '../../services/node-api/node-api.service';
import {FormsModule} from '@angular/forms';
import {JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-matrix-result',
  standalone: true,
  imports: [
    Card,
    FormsModule,
    NgIf,
    JsonPipe,
  ],
  templateUrl: './matrix-result.component.html',
  styleUrl: './matrix-result.component.scss'
})
export class MatrixResultComponent {

  matrixStr = '[[1,2,3],[4,5,6]]';  // entrada como string
  rotatedMatrix: number[][] = [];
  statistics: any = null;
  errorMsg = '';

  private readonly goApi = inject(GoApiService);
  private readonly nodeApi = inject(NodeApiService);

  submitMatrix() {
    this.errorMsg = '';
    let matrix: number[][];
    try {
      matrix = JSON.parse(this.matrixStr);
    } catch {
      this.errorMsg = 'Formato de matriz inválido';
      return;
    }
  }

}
