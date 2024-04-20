import { Pressable, StyleSheet, Text, View,Switch } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Import Animatable library
import { Colors } from '../../constants/styles';
import { AuthContext } from '../../store/auth-context';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
function ProfileButton({ children, onPress,dark ,isDarkModeEnabled,toggleDarkMode}) {
    const authCtx = useContext(AuthContext);
    const {t} = useTranslation();
  return (
    
    <Pressable
    style={({ pressed }) => [styles.secctr, {backgroundColor: authCtx.darkMode ? Colors.darksec2 : Colors.white},pressed && styles.pressed]}
    onPress={onPress}
  >
    <Animatable.View animation="bounceIn" duration={1000} style={{flex:1,alignItems:'center',justifyContent:'center'  }}>
     
                              <Text style={[styles.sectionTitle,{color: authCtx.darkMode ?  Colors.white : '#000'  }]}>{t(children)}</Text>
                              {dark && <Switch
            value={isDarkModeEnabled}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: Colors.primary100 }}
            thumbColor={isDarkModeEnabled ? Colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />}
                         
     </Animatable.View>
      </Pressable>
      
  );
}

export default ProfileButton;

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
        textAlign:'center',
        
    },
   
    secctr:{
        width:'45%',
        height:100,
        alignItems:'center',justifyContent:'center',
   
        margin:5,
        padding:5,
        flexDirection:'row', justifyContent:'space-between',borderRadius:10,alignItems:'center',shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },pressed: {
        opacity: 0.7,
      }
});
