import { useMemo } from 'react';

import { weekDays } from 'src/constants/weekdays';
import { ScheduleRoutineData } from 'src/interfaces/routine';

const useFindClosestRoutine = (scheduleRoutines: ScheduleRoutineData[]) => {
  const closestRoutine = useMemo(() => {
    const dayIndex = new Date().getDay();
    const upcomingRoutines = scheduleRoutines.filter(routine => {
      const routineDayIndex = weekDays.indexOf(routine.day);
      return routineDayIndex >= dayIndex;
    });

    if (upcomingRoutines.length > 0) {
      return upcomingRoutines[0];
    }

    return scheduleRoutines[0];
  }, [scheduleRoutines]);

  return closestRoutine;
};

export default useFindClosestRoutine;
