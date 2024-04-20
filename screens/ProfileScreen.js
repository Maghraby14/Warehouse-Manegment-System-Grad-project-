import {ImageBackground, Text,View,StyleSheet,ScrollView,Switch} from 'react-native';
import ProfileCard from '../components/WelcomeScreenComponents/ProfileCard';
import { AuthContext } from '../store/auth-context';
import { useContext } from 'react';
import ProfileInfo from '../components/ProfileScreenComponents/ProfileInfo';
import ProfileOptions from '../components/ProfileScreenComponents/ProfileOptions';
import { Colors } from '../constants/styles';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
function ProfileScreen(){
    const authCtx = useContext(AuthContext);
   const {t} = useTranslation();    
    
    return <>
    <ImageBackground source={authCtx.darkMode ?  require('../assets/Frame 7 (3).png') : require('../assets/Frame 7 (1).png')} style={{flex:1}}>
    <View style={{alignItems:'center' ,flex:1}}>
    <ProfileInfo name={authCtx.name} uri={authCtx.profuri}/>
    <View style={[styles.flowContainer, {backgroundColor: authCtx.darkMode ? Colors.darksec : Colors.primary100}]}>
            <View style={styles.flowItem}>
              <Text style={styles.flowLabel}>{t("inflow")}</Text>
              <Text style={styles.flowValue}>$1000</Text>
            </View>
            <View style={styles.flowItem}>
              <Text style={styles.flowLabel}>{t("current")}</Text>
              <Text style={styles.flowValue}>$500</Text>
            </View>
            <View style={styles.flowItem}>
              <Text style={styles.flowLabel}>{t("outflow")}</Text>
              <Text style={styles.flowValue}>$300</Text>
            </View>
          </View>
    <ProfileOptions isDarkModeEnabled={authCtx.darkMode} toggleDarkMode={authCtx.toggledarkMode} />
    
    </View>
    </ImageBackground>
    
    </>
}
export default ProfileScreen;
const styles = StyleSheet.create({
    imageBackground: {
      flex: 1,
    },
    container: {
      alignItems: 'center',
      flex: 1,
    },
    flowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems:'center',
      marginTop: 20,
     width:'85%'
    ,
    height:'10%',
    
    shadowColor: '#000',
   shadowOffset: {
     width: 2,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
   borderRadius: 20,
   marginTop: 20,
   paddingHorizontal:30,
    },
    flowItem: {
      alignItems: 'center',
    },
    flowLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    flowValue: {
      fontSize: 16,
      color: 'white',
    },
  });
  
