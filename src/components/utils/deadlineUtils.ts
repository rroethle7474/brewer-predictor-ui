import { DEADLINE_DATE } from '../constants/deadlineConfig';

export const isDeadlinePassed = (): boolean => {
  const now = new Date();
  const deadline = new Date(DEADLINE_DATE);
  return now > deadline;
};