import { PredictionDto } from '../types/predictionDto';

export const sortPredictions = (
  predictions: PredictionDto[], 
  field: 'name' | 'wins', 
  direction: 'asc' | 'desc'
): PredictionDto[] => {
  return [...predictions].sort((a, b) => {
    let comparison = 0;
    
    if (field === 'name') {
      // Sort by full name
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      comparison = nameA.localeCompare(nameB);
    } else {
      // Sort by wins
      comparison = a.wins - b.wins;
    }
    
    // Apply direction
    return direction === 'asc' ? comparison : -comparison;
  });
};