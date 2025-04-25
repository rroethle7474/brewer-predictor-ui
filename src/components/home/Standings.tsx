"use client"

import React from 'react';
import { useStandings } from '../hooks/useStandings';

const Standings: React.FC = () => {
  const { standings, isLoading, error } = useStandings();
  
  // Helper to format the percentage (e.g. 0.615 to .615)
  const formatPct = (pct: number): string => {
    return `.${Math.round(pct * 1000).toString().padStart(3, '0')}`;
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-brewers-navy">National League Central</h2>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brewers-navy"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-brewers-navy">National League Central</h2>
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          Error loading standings: {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-brewers-navy">National League Central</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-700 border-b">
              <th className="pb-2">Team</th>
              <th className="pb-2 text-center">W</th>
              <th className="pb-2 text-center">L</th>
              <th className="pb-2 text-right">Pct</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {standings.map((team) => (
              <tr key={team.id} className="border-b hover:bg-gray-50">
                <td className="py-3">
                  <div className="flex items-center">
                    {team.team}
                  </div>
                </td>
                <td className="py-3 text-center">{team.wins}</td>
                <td className="py-3 text-center">{team.losses}</td>
                <td className="py-3 text-right">{formatPct(team.pct)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Standings;