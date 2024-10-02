export type Gender =
  | 'MALE'
  | 'FEMALE'
  | 'NON_BINARY'
  | 'PREFER_NOT_SPECIFY'
  | '';
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
  gender: Gender;
  pushNotification: boolean;
}

export interface TrainingPreference {
  id?: string;
  type: string;
  time: number;
  intensity: string;
}

export interface GrowRecordRequest {
  height: number;
  weight: number;
}

export interface GrowRecordResponse {
  message: string;
  data: GrowRecordData;
  error: boolean;
}

export interface GrowRecordData {
  height: number;
  heightMeasure: string;
  weight: number;
  weightMeasure: string;
  createdAt: Date;
}

export interface TrainingPreferenceResponse {
  message: string;
  data: TrainingPreferenceData;
  error: boolean;
}

export interface TrainingPreferenceData {
  id: string;
  type: string;
  intensity: string;
  time: number;
}
