import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/ui/Button';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation(); // Get navigation object

  async function signupHandler({ email, password,profilePic }) {
    setIsAuthenticating(true);
    authCtx.getEmail(email);
    
    try {
      const token = await createUser(email, password);

      authCtx.authenticate(token);
      
      navigation.replace('InputData');
      
      
    } catch (err) {
      Alert.alert('Authentication failed', 'Could not create user');
      console.log(err.message);
      setIsAuthenticating(false);
    }
  }


  

  return <>
  <AuthContent onAuthenticate={signupHandler} />

  </>;
}

export default SignupScreen;
