import { Text, View, ScrollView, Switch, StyleSheet,Pressable } from 'react-native';
import ProfileButton from './ProfileButton';
import { AuthContext } from '../../store/auth-context';
import { useContext } from 'react';
import { Colors } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';
function ProfileOptions({isDarkModeEnabled, toggleDarkMode}) {
    const authCtx = useContext(AuthContext);
    const navigation = useNavigation();
    const navigateToLanguageScreen = () => {
      navigation.navigate('Language');
    };
  return (
    <View style={[styles.container,{backgroundColor: authCtx.darkMode ? Colors.darksec : Colors.sec100 }]}>
      <Text style={styles.header}>Settings</Text>
      <ScrollView style={styles.scrollView}>
        <View style={{flexDirection:'row' , flexWrap:'wrap', justifyContent:'center',flex:1}}>
       
      <ProfileButton dark={true} isDarkModeEnabled={isDarkModeEnabled} toggleDarkMode={toggleDarkMode}>darkMode</ProfileButton>
        <ProfileButton>Robots</ProfileButton>
        {/*
         <View style={styles.secctr}>
                                <Text style={styles.sectionTitle}>Dark Mode</Text>
                                <Switch
            // Implement your logic to handle dark mode toggle
            // value={isDarkModeEnabled}
            // onValueChange={toggleDarkMode}
          />
        </View>
        */}
       

        {/* Add more settings here */}
        {/* Example setting: Log Out */}
        
          {/* Implement your logic to handle log out */}
          {/* <Button title="Log Out" onPress={handleLogOut} /> */}
       

        {/* Add more settings as needed */}
        <ProfileButton onPress={navigateToLanguageScreen}>language</ProfileButton>
       
        <ProfileButton onPress={authCtx.logout}>logout</ProfileButton>
       
        </View>
     
      </ScrollView>
    </View>
  );
}
export default ProfileOptions;
const styles = StyleSheet.create({
  container: {
    height:'40%',
    padding: 10,
    margin:10,
    width: '85%',
   
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
    
    

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',textAlign:'center'
  },
  scrollView: {
    flex: 1,
    
    
   
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
},

secctr:{
    margin:5,
    padding:5,
    flexDirection:'row', justifyContent:'space-between',backgroundColor:'white',borderRadius:10,alignItems:'center',shadowColor: '#000',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
},pressed: {
    opacity: 0.7,
  },sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
},

secctr:{
    margin:5,
    padding:5,
    flexDirection:'row', justifyContent:'space-between',backgroundColor:'white',borderRadius:10,alignItems:'center',shadowColor: '#000',
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


