import { useState, useEffect, useCallback } from 'react';
import { standingsApi } from '../api/standingsApi';
import { StandingDto } from '../types/standingDto';
import { StandingWithPct } from '../types/standingWithPct';

export const useStandings = () => {
  const [standings, setStandings] = useState<StandingWithPct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const calculatePct = (wins: number, losses: number): number => {
    const total = wins + losses;
    if (total === 0) return 0;
    return wins / total;
  };
  
  const formatStandings = useCallback((data: StandingDto[]): StandingWithPct[] => {
    return data.map(team => ({
      ...team,
      pct: calculatePct(team.wins, team.losses)
    })).sort((a, b) => b.pct - a.pct);
  }, []);
  
  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await standingsApi.getStandings();
        const formattedData = formatStandings(data);
        setStandings(formattedData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to fetch standings');
        console.error('Error in useStandings:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStandings();
  }, [formatStandings]);
  
  return { standings, isLoading, error };
};