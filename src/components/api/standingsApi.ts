import { StandingDto } from '../types/standingDto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7226/api';

export const standingsApi = {
  // Get all standings
  getStandings: async (): Promise<StandingDto[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/standings`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching standings:', error);
      throw error;
    }
  }
};