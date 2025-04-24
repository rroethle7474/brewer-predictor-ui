import React from 'react';
import LeaderboardRow from './LeaderboardRow';
import { PredictionDto } from '../types/predictionDto';

interface LeaderboardTableProps {
  predictions: PredictionDto[];
  deadlinePassed: boolean;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ 
  predictions, 
  deadlinePassed 
}) => {
  return (
    <table className="min-w-full border-collapse table-auto">
      <thead className="bg-gray-100">
        <tr>
          {deadlinePassed && (
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Rank
            </th>
          )}
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="py-3 px-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
            Predicted Wins
          </th>
          <th className="py-3 px-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
            Submitted
          </th>
        </tr>
      </thead>
      <tbody>
        {predictions.map((prediction, index) => (
          <LeaderboardRow
            key={prediction.id}
            prediction={prediction}
            rank={index + 1}
            deadlinePassed={deadlinePassed}
          />
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;