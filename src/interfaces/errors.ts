import { AxiosError } from 'axios';

import { ApiCodes } from 'src/constants/api-codes';

export type ApiError = AxiosError<{
  data: { type?: ApiCodes };
  error: boolean;
  message: true;
}>;
