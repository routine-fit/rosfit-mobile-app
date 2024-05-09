import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = Config.API_BASE_URL;
const rosFitApi = axios.create({ baseURL });

rosFitApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export default rosFitApi;
