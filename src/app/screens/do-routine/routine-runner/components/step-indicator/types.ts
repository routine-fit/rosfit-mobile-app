export type StepStatus = 'pending' | 'inProgress' | 'done';

export interface StepData {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
}
