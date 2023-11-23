import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';

if (Config.USE_EMULATOR === 'true') {
  auth().useEmulator('http://127.0.0.1:9099');
}
