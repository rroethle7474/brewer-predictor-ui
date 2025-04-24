"use client"

import React, { useState } from 'react';
import LeaderboardTable from './LeaderboardTable';
import SortControls from './SortControls';
import { isDeadlinePassed } from '../utils/deadlineUtils';
import { PredictionDto } from '../types/predictionDto';
import { sortPredictions } from '../utils/sortingUtils';

interface LeaderboardSectionProps {
  predictions: PredictionDto[];
  isLoading: boolean;
  error: string | null;
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({
  predictions,
  isLoading,
  error
}) => {
  const deadlinePassed = isDeadlinePassed();
  const [sortField, setSortField] = useState<'name' | 'wins'>('wins');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: 'name' | 'wins') => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default direction
      setSortField(field);
      setSortDirection(field === 'name' ? 'asc' : 'desc');
    }
  };
  
  const sortedPredictions = sortPredictions(predictions, sortField, sortDirection);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-brewers-navy">
        {deadlinePassed ? "Prediction Leaderboard" : "Latest Predictions"}
      </h2>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brewers-navy"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          Error loading predictions: {error}
        </div>
      ) : sortedPredictions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No predictions have been submitted yet.
        </div>
      ) : (
        <>
          <SortControls 
            sortField={sortField} 
            sortDirection={sortDirection} 
            onSort={handleSort} 
          />
          <div className="overflow-x-auto">
            <LeaderboardTable 
              predictions={sortedPredictions} 
              deadlinePassed={deadlinePassed} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderboardSection;