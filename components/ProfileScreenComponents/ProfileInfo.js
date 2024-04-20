import { StyleSheet, View, Image, Text,Pressable } from "react-native";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import { useContext, useEffect, useState } from "react";
import {Feather,MaterialIcons} from '@expo/vector-icons';
import { Colors } from "../../constants/styles";
import { useTranslation } from 'react-i18next';
import { useNavigation } from "@react-navigation/native";
function ProfileInfo({ name,uri }) {
  const authCtx = useContext(AuthContext);
  const [space,setSpace] = useState('');
  const [robots,setRobots] = useState('');
  const {t} = useTranslation();
  const navigation = useNavigation();
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authCtx.userDataBaseid}` + '.json');
        authCtx.setSpace(response.data['Space'].length);
        authCtx.setRobots(response.data['Robots'].length);
        
      }
      catch(err){
        console.log(err+'in profile info');
      }
      
    }
    fetchData();
  },[authCtx.space,authCtx.robots])
  return (
    <View style={[styles.root,{backgroundColor : authCtx.darkMode ?  Colors.darksec : Colors.primary100}]}>
    <View style={[styles.container,{backgroundColor : authCtx.darkMode ? Colors.darksec : Colors.primary100}]}>
      <View style={styles.imgContainer}>
        <Image
          source={{uri:authCtx.profuri}}
          style={styles.image}
        />
        <View style={{position: 'absolute',bottom: -20,left: 7,right: 7,backgroundColor: 'white', // Adjust opacity as neede
        padding: 10,borderRadius: 10,width:'90%'}}>
        <Text style={{ textAlign:'center',fontSize: 16,color: 'black'}}>{authCtx.name.substring(0,authCtx.name.indexOf(' '))}</Text>
        </View>
        
      </View>
      <View style={{flexDirection:'column',alignItems:'flex-end'}}>
      <Pressable
      style={({ pressed }) =>  pressed && styles.pressed}
      onPress={()=>navigation.navigate( 'EditProf')}
    >
      <Feather name="edit" size={24} color="white" style={{marginRight:10}} />
     </Pressable>
      <View style={{flexDirection:'row',height:100}}>
      <View style={styles.textContainer}>
        <Text style={[styles.title,{color:'white' }]}>{authCtx.robots}</Text>
        <Text style={styles.name} >{t('Robots')}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title,{color:'white' }]}>{authCtx.space}</Text>
        <Text style={styles.name} >{t('Section')}</Text>
      </View>
      </View>
      </View>
      
      
    </View>
    <View style={styles.contactContainer}>
        {/*
<View style={styles.contactItem}>
          <Feather name="phone" size={20} color='white' />
          <Text style={styles.contactText}>01018189065</Text>
        </View>
*/}
        <View style={styles.contactItem}>
          <MaterialIcons name="email" size={20} color='white' />
          <Text style={styles.contactText}>{authCtx.email}</Text>
        </View>
      </View>
   
</View>
  
    );
}

export default ProfileInfo;

const styles = StyleSheet.create({
    root:{
    flexDirection:'column',

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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
   
    width: "100%",
    height: 200,
    
    
  },
  imgContainer: {
    marginRight: 10,
    shadowColor: '#000',
    flexDirection: 'column',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth:2,
  },
  textContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  name: {
    
    fontSize: 16,
    color:'white'
  },
  contactContainer: {
    marginTop: 0,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
  pressed: {
    opacity: 0.7,
  }
});
