import * as React from 'react';
import { View, Text, StyleSheet,ImageBackground } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';
import { useContext } from 'react';
import { Colors } from '../constants/styles';
const LanguagesScreen = () => {
  
  const { t, i18n } = useTranslation();

  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  return (
    <View style={{flex:1,backgroundColor:authCtx.darkMode ? Colors.darkprimary : Colors.primary100}} >
    <View style={styles.container}>
    <View style={[{backgroundColor: authCtx.darkMode ? Colors.darksec : 'white',alignItems: 'center',borderRadius: 20,
    marginTop: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}]}>
      <Text style={[styles.title,{color:authCtx.darkMode ? 'white' : 'black'}]}>{t('selectLanguage')}</Text>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionText,{color:authCtx.darkMode ? 'white' : 'black'}]}>English</Text>
        <View style={[styles.optionRadio]}>
        <RadioButton
          value="en"
          status={ i18n.language==='en' ? 'checked' : 'unchecked'}
          onPress={() => { i18n.changeLanguage('en'); navigation.goBack()}}
          color={authCtx.darkMode ? Colors.white:Colors.darkprimary}
        />
        </View>
        
      </View>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionText,{color:authCtx.darkMode ? 'white' : 'black'}]}>française</Text>
        <View style={styles.optionRadio}>
        <RadioButton
          value="fr"
          status={ i18n.language==='fr' ? 'checked' : 'unchecked'}
          onPress={() => { i18n.changeLanguage('fr'); navigation.goBack() }}
          color={authCtx.darkMode ? Colors.white:Colors.darkprimary}
        />
        </View>
        
      </View>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionText,{color:authCtx.darkMode ? 'white' : 'black'}]}>española</Text>
        <View style={styles.optionRadio}>
        <RadioButton
          value="es"
          status={ i18n.language==='es' ? 'checked' : 'unchecked'}
          onPress={() => { i18n.changeLanguage('es'); navigation.goBack()}}
          color={authCtx.darkMode ? Colors.white:Colors.darkprimary}
        />
        </View>
        
      </View>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionText,{color:authCtx.darkMode ? 'white' : 'black'}]}>عربي</Text>
        <View style={styles.optionRadio}>
        <RadioButton
          value="ar"
          status={ i18n.language==='ar' ? 'checked' : 'unchecked'}
          onPress={() => {i18n.changeLanguage('ar'); navigation.goBack() }}
          color={authCtx.darkMode ? Colors.white:Colors.darkprimary}
        />
        </View>
        
      </View>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionText,{color:authCtx.darkMode ? 'white' : 'black'}]}>Deutsch</Text>
        <View style={styles.optionRadio}>
        <RadioButton
          value="de"
          status={i18n.language==='de' ? 'checked' : 'unchecked'}
          onPress={() => {i18n.changeLanguage('de'); navigation.goBack() }}
          color={authCtx.darkMode ? Colors.white:Colors.darkprimary}
        />
        </View>
        
      </View>
      
      
    </View>
    </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black',
    textAlign:'center'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,

  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    flex:1,
    color:'black'
  },
  optionRadio:{
    flex:1,
    justifyContent:'flex-end',
    
   
  }
});

export default LanguagesScreen;
