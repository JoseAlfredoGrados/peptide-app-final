export interface PredictionFormData {
  hla: string;
  peptide: string;
  mhc: string;
}

export interface PredictionResult {
  hla: string;
  peptide: string;
  mhc: string;
  prediction: number;
  score: number;
}