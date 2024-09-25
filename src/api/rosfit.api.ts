import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import getNavigationRef from 'src/app/navigation/helper';
import firebaseAuth from 'src/config/firebase';
import { ApiCodes } from 'src/constants/api-codes';
import { ApiError } from 'src/interfaces/errors';

const baseURL = Config.API_BASE_URL;
const rosFitApi = axios.create({ baseURL });

rosFitApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

rosFitApi.interceptors.response.use(
  res => res,
  async (error: ApiError) => {
    console.warn(
      '\x1b[31m%s\x1b[0m',
      'RESPONSE ERROR:',
      `${error?.request?.responseURL}, ${error?.response?.status}`,
      JSON.stringify(error?.response?.data, undefined, 2),
    );
    if (error.response?.status === 401) {
      if (error.response?.data?.data?.type === ApiCodes.TOKEN_EXPIRED) {
        const { config } = error;
        const user = firebaseAuth.currentUser;
        if (user && config) {
          const token = await user.getIdToken(true);
          config.headers.Authorization = token;
          await AsyncStorage.setItem('token', token);
          return new Promise((resolve, reject) => {
            axios.request(config).then(resolve).catch(reject);
          });
        }
      }

      const navigation = getNavigationRef();
      navigation?.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      await AsyncStorage.setItem('token', '');
    }

    return Promise.reject(error);
  },
);

export default rosFitApi;
