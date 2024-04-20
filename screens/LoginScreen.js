import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import axios from 'axios';
import { login } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import * as Notifications from 'expo-notifications';
function LoginScreen() {
    const [isAuthenticating,setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);
    
    async function loginHandler({email, password}){
      setIsAuthenticating(true)
      try{
        const token = await login(email, password);
        authCtx.authenticate(token);
        authCtx.getEmail(email);
        authCtx.settingData();
          
          

      }
      catch(err){
        Alert.alert('Authentication Failed ','Could not login')
        setIsAuthenticating(false); 
      }
      
      
    }
    if(isAuthenticating){
      return <LoadingOverlay message='logging you in ...'/>
    }
  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
