import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const firebaseAuth = auth();

if (Config.USE_EMULATOR === 'true') {
  firebaseAuth.useEmulator('http://127.0.0.1:9099');
}

GoogleSignin.configure({
  webClientId: Config.WEBCLIENT_ID,
});

export default firebaseAuth;
