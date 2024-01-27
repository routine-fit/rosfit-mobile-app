import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';

const firebaseAuth = auth();

if (Config.USE_EMULATOR === 'true') {
  firebaseAuth.useEmulator('http://127.0.0.1:9099');
}

export default firebaseAuth;
