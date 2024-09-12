export interface StepProps {
  title: string;
  description: string;
  status: string;
}

export type Status = 'pending' | 'inProgress' | 'done';
