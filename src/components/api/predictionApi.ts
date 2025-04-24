import { PredictionDto } from '../types/predictionDto';
import { PredictionRequestDto } from '../types/predictionRequestDto';
import { config } from '../../config';

const API_BASE_URL = config.apiBaseUrl;

export const predictionApi = {
  // Get all predictions
  getPredictions: async (): Promise<PredictionDto[]> => {
    try {
      console.log(API_BASE_URL);
      const response = await fetch(`${API_BASE_URL}/predictions`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching predictions:', error);
      throw error;
    }
  },
  
  // Add a new prediction
  addPrediction: async (prediction: PredictionRequestDto): Promise<PredictionDto> => {
    try {
      const response = await fetch(`${API_BASE_URL}/predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prediction)
      });
      
      if (!response.ok) {
        // For better error handling with specific error messages
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData || `Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding prediction:', error);
      throw error;
    }
  }
};