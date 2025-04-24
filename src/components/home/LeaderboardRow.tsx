import React from 'react';
import { PredictionDto } from '../types/predictionDto';

interface LeaderboardRowProps {
  prediction: PredictionDto;
  rank: number;
  deadlinePassed: boolean;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ 
  prediction, 
  rank, 
  deadlinePassed 
}) => {
  const fullName = `${prediction.firstName} ${prediction.lastName}`.trim();
  const formattedDate = new Date(prediction.createdOn).toLocaleDateString();
  
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {deadlinePassed && (
        <td className="py-3 px-4 text-center font-medium text-brewers-navy">
          {rank}
        </td>
      )}
      <td className="py-3 px-4">
        {fullName}
      </td>
      <td className="py-3 px-4 text-center font-semibold">
        {prediction.wins}
      </td>
      <td className="py-3 px-4 text-gray-500 text-sm text-right">
        {formattedDate}
      </td>
    </tr>
  );
};

export default LeaderboardRow;