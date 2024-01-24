import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative({
    asyncStorage: true,
    networking: true,
    editor: true,
    errors: true,
    overlay: true,
  })
  .use(reactotronRedux())
  .connect();

export default reactotron;
