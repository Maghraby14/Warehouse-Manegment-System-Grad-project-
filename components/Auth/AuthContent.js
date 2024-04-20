import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';
import { ImageBackground , Image} from 'react-native';
import { useTranslation } from 'react-i18next';
function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if(isLogin){
      navigation.replace('SignupStack');
    }
    else{
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;
  
    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <ImageBackground source={require('../../assets/Frame 7 (1).png')} style={{flex:1}}>
      
      <View style={styles.authContent}> 
      <View style={{ alignItems:'center'}}>
      <Image
        source={require('../../assets/Ellipse 14.jpg')}
        style={{ width: 100, height: 100 }}
      />
      </View>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? t('createNewUser') : t('login')}
        </FlatButton>
      </View>
    </View>
    </ImageBackground>
    
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 100,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
   
    
    
  },
  buttons: {
    marginTop: 8,
  },
});
