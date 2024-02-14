export interface UserInfoResponse {
  message: string;
  data: userInfoData;
  error: boolean;
}

export interface userInfoData {
  firebaseUid: string;
  name: string;
  lastName: string;
  birthDate: string;
  gender: string;
  pushNotification?: boolean;
  routines?: any[];
  growthRecords?: any[];
}
