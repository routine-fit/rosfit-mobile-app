export interface TrainingInfo {
  label: string;
  value: string;
}

export interface PersonalRecord {
  exercise: string;
  weight: string;
}

export interface DashboardData {
  routine: {
    title: string;
    duration: string;
  };
  trainingInfo: TrainingInfo[];
  personalRecords: PersonalRecord[];
}
