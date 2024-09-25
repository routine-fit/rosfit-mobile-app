export interface ProfileData {
  displayName: string;
  name: string;
  lastName: string;
  gender: string;
  email: string;
  birthDate: string;
  weight: string;
  height: string;
  trainingType: string;
  trainingTime: string;
  trainingIntensity: string;
  trainingGoals: string;
  password: string;
}

export interface ProfileInfoResponse {
  message: string;
  data: ProfileInfoResponseData;
  error: boolean;
}

export interface ProfileInfoResponseData {
  personalInformation: PersonalInformation;
  trainingPreference: TrainingPreference;
  growRecords: GrowRecord[];
}

export interface GrowRecord {
  height: number;
  heightMeasure: string;
  weight: number;
  weightMeasure: string;
  createdAt: Date | '';
}

export interface PersonalInformation {
  name: string;
  lastName: string;
  birthDate: Date | '';
  gender: string;
  pushNotification: boolean;
}

export interface TrainingPreference {
  id: string;
  type: string;
  intensity: string;
}
