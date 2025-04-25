import React from 'react';
import { DEADLINE_FORMATTED } from '../../components/constants/deadlineConfig';
import { isDeadlinePassed } from '../utils/deadlineUtils';

const DeadlineBanner: React.FC = () => {
  const deadlinePassed = isDeadlinePassed();

  return (
    <>
    <div className={`mb-6 p-4 rounded-lg text-center ${
      deadlinePassed ? 'bg-brewers-navy' : 'bg-brewers-gold'
    }`}>
      <h2 className="text-xl font-bold mb-1">
        {deadlinePassed 
          ? "Prediction period has ended" 
          : "Submit your Brewers season win prediction!"
        }
      </h2>
      <p>
        {deadlinePassed
          ? "The leaderboard now shows all submitted predictions. Stay tuned for updates as the season progresses!"
          : `Deadline for submissions: ${DEADLINE_FORMATTED}`
        }
      </p>
    </div>
    </>
  );
};

export default DeadlineBanner;