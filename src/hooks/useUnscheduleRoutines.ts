import { useMemo } from 'react';

import { Routine, ScheduleRoutineData } from 'src/interfaces/routine';

export const useUnscheduledRoutines = (
  regularRoutines: Routine[],
  scheduleRoutines: ScheduleRoutineData[],
) => {
  const unscheduledRoutines = useMemo(() => {
    const scheduledRoutineIds = scheduleRoutines.map(
      schedule => schedule.routine.id,
    );

    return regularRoutines.filter(
      routine => !scheduledRoutineIds.includes(routine.id),
    );
  }, [regularRoutines, scheduleRoutines]);

  return unscheduledRoutines;
};
