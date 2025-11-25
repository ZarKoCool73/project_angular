export interface RequestDataGo {
  data: number[][];
}

export interface QRResult {
  matrixQ: number[][];
  matrixR: number[][];
}

export interface ResponseDataNode {
  success: boolean;
  message: string;
  data: DataResponse;
  timestamp: string;
}

// Estadísticas básicas
export interface BasicStats {
  max: number;
  min: number;
  sum: number;
  average: number;
  count: number;
}

// Estadísticas avanzadas
export interface AdvancedStats {
  median: number;
  variance: number;
  standardDeviation: number;
}

// Objeto de estadísticas
export interface Statistics {
  basic: BasicStats;
  advanced: AdvancedStats;
}

// Información de análisis de cada matriz
export interface MatrixInfo {
  name: string;
  dimensions: string;
  isSquare: boolean;
  isDiagonal: boolean;
  isUpperTriangular: boolean;
}

// Validaciones adicionales
export interface MatrixValidations {
  qIsOrthogonal: boolean;
  rIsUpperTriangular: boolean;
}

// Análisis completo de matrices
export interface MatrixAnalysis {
  matrixQ: MatrixInfo;
  matrixR: MatrixInfo;
  validations: MatrixValidations;
}

// Contenido de data
export interface DataResponse {
  statistics: Statistics;
  matrixAnalysis: MatrixAnalysis;
  timestamp: string;
}
