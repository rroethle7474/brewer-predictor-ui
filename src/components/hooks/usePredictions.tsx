import { useState, useEffect } from 'react';
import { predictionApi } from '../api/predictionApi';
import { PredictionDto } from '../types/predictionDto';
import { PredictionRequestDto } from '../types/predictionRequestDto';

export const usePredictions = () => {
  const [predictions, setPredictions] = useState<PredictionDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch predictions on mount
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await predictionApi.getPredictions();
        setPredictions(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          console.error('Error in usePredictions:', err);
        } else {
          setError('Failed to fetch predictions');
          console.error('Error in usePredictions:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPredictions();
  }, []);
  
  // Function to add a new prediction
  const addPrediction = async (newPrediction: PredictionRequestDto): Promise<PredictionDto> => {
    try {
      const addedPrediction = await predictionApi.addPrediction(newPrediction);
      setPredictions(prev => [...prev, addedPrediction]);
      return addedPrediction;
    } catch (err) {
      // Let the component handle the error
      throw err;
    }
  };
  
  return { predictions, isLoading, error, addPrediction };
};