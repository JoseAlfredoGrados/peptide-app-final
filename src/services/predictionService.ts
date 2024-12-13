// services/predictionService.js
import axios from 'axios';
import type { PredictionFormData, PredictionResult } from '../types';

const API_URL = 'http://192.168.100.29:5000/predict';

export const predictPMHC = async (
  data: PredictionFormData
): Promise<PredictionResult[]> => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    throw error;
  }
};