"use client";
import DeadlineBanner from '../components/home/DeadlineBanner'
import PredictionForm from '../components/form/PredictionForm';
import LeaderboardSection from '../components/home/LeaderboardSection';
import { usePredictions } from '../components/hooks/usePredictions';
import { isDeadlinePassed } from '../components/utils/deadlineUtils';
import Standings from '@/components/home/Standings';
import Rules from '@/components/home/Rules';

export default function Home() {
  const { predictions, isLoading, error, addPrediction } = usePredictions();
  const deadlinePassed = isDeadlinePassed();
  return (
    <div className="container mx-auto px-4 py-6">
    <DeadlineBanner />
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {!deadlinePassed && (
        <div className="md:col-span-1">
          <PredictionForm onSubmit={addPrediction} />
        </div>
      )}
      
      <div className={deadlinePassed ? "md:col-span-2" : "md:col-span-1"}>
        <LeaderboardSection 
          predictions={predictions} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
    <div className="mt-8">
        <Standings />
      </div>
      <div className="mt-8">
        <Rules />
      </div>
    </div>
  );
}
