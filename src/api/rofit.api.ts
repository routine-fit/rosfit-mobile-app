import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = process.env.API_BASE_URL;
const roFitApi = axios.create({ baseURL });

roFitApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export default roFitApi;
