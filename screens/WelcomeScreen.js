import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import ProfileCard from '../components/WelcomeScreenComponents/ProfileCard';
import Options from '../components/WelcomeScreenComponents/Options';
import { useEffect, useState ,useContext, useLayoutEffect} from 'react';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { ProductContext } from '../store/products-data';
import * as Notifications from 'expo-notifications';
import firebaseConfig from '../src/firebaseConfig';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {FirebaseDataContext} from '../store/firebase-data'
import { Colors } from '../constants/styles';
function WelcomeScreen({navigation,route}) {
  const authCtx =useContext(AuthContext);
  const [dataLoaded,setdataLoaded] =useState(false);
  const [alarm,setalarm] = useState(false);
   const [expired,setexpired] = useState(false);
   const { firebaseData, updateData } = useContext(FirebaseDataContext);
   

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get('https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses.json')
        
       for (const key in response.data) {
        if (response.data[key]['Email'] == authCtx.email) {
        authCtx.setuserDataBaseid(key);
        const responsee = await axios.get(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${key}`+'.json');
        
        authCtx.setName(responsee.data['Owner']);
        authCtx.setimage(responsee.data['uri']);
        setdataLoaded(true);
        
           }
          }  
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    fetchData(); 
    //console.log(authCtx.name);
  }, [authCtx.name]); 
  const products = useContext(ProductContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authCtx.userDataBaseid) {
          //console.log(db[authCtx.userDataBaseid].Space);
          const response = firebaseData.Space;
          let allProducts = [];
          let WarehouseCapacity = 0;
  
          response.map( (item) => {
            if (item.products) {
              allProducts.push(item.products);
            }
            WarehouseCapacity += parseInt(item.capacity);
          })
  
          products.loadProducts(allProducts);
          products.getCapacity(WarehouseCapacity);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
        products.loadProducts([]);
      }
    };
  
    fetchData();
    //console.log(db)
  }, [firebaseData]);

  
  useEffect(()=>{
    const subscrition = Notifications.addNotificationReceivedListener((notification)=>{
        console.log('Notification Received')
        if(notification.request.content.data.product){
          setalarm(false);
        setexpired(false);
        }
        
        
        
    })
    const subscrition1= Notifications.addNotificationResponseReceivedListener((response)=>{
        console.log('Notification Response Received')
        if(response.notification.request.content.data.product){
          navigation.navigate('ProductDetails',{
            product:response.notification.request.content.data.product
        })
        }
        
        

        //navigation.navigate('Language')

    })
    return ()=>{
        subscrition.remove();
        subscrition1.remove();
    }
},[])
useEffect(() =>{
    
    const scheduleNotificationHandler = async (timeinSeconds,title,body,data) => { 
        //await requestPermissionsAsync();
        //const settings = await Notifications.getPermissionsAsync();
        
         Notifications.scheduleNotificationAsync({

                content: { 
                    title: title, 
                    body: body,
                    sound:true, 
                    data: data ,
                }, 
                trigger: { seconds: timeinSeconds} 
            }); 
            
        }
       // scheduleNotificationHandler(30,'Product Expired',"A Product Must Be removed From Warehouse",{Name:'Mohamed'}); 
},[])
useEffect(() => {
  const scheduleNotificationHandler = async (timeinSeconds, title, body, data) => { 
    //await requestPermissionsAsync();
    //const settings = await Notifications.getPermissionsAsync();
    
    Notifications.scheduleNotificationAsync({
      content: { 
        title: title, 
        body: body,
        sound: true, 
        data: data ,
      }, 
      trigger: { seconds: timeinSeconds } 
    }); 
  };

  const getDateDifference = (product) => {
    targetDate = new Date(product.expiry);
    const currentDate = new Date();
    const difference = targetDate - currentDate;
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
    
      if (daysDifference === 3 && !product.alarm && !alarm) {
        product.alarm = true;
        products.setAlarm(product.id);
        setalarm(true);
        scheduleNotificationHandler(1, 'Remaider', product.name + " Only has 3 days to be removed from Warehouse", { product: product });
      }
     else if(Math.floor(difference / 1000) === 0) {
        if (!product.expired && !expired) {
          product.expired = true;
          setexpired(true);
          products.setExpired(product.id);
          scheduleNotificationHandler(1, 'Product Expired', product.name + " Must Be removed From Warehouse", { product: product });
        }
      
    }
  };

  products.products.forEach((sec) => {
    sec.forEach((pro) => {
      getDateDifference(pro);
    });
  });
}, [products.products]);

  return (
    <ImageBackground source={authCtx.darkMode ? require('../assets/Frame 7 (3).png') : require('../assets/Frame 7 (1).png')} style={{flex:1}}>
      
      { dataLoaded &&   
      <View style={{alignItems:'center',flex:1 }}>
      <ProfileCard name={authCtx.name} uri={authCtx.profuri}/>
      <Options />
      <View  style={styles.section}>
                                <View style={[styles.secctr,{backgroundColor: authCtx.darkMode ? Colors.darksec : Colors.white}]}>
                                <Text style={[styles.sectionTitle,{color:authCtx.darkMode ? Colors.white : '#000'}]}>{'Feed'} </Text>
                                 
                                </View> 
      </View> 
      </View> }
      {!dataLoaded &&  <LoadingOverlay message='Loading Your Data'/>}
    </ImageBackground>
  );
  /* <View style={styles.rootContainer}>
  <Text style={styles.title}>Welcome!</Text>
  <Text>You authenticated successfully!</Text>
</View>*/ 
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
},
section: {
    marginBottom: 10 ,flex:1 ,borderWidth:0,width:'90%'     
    
},
secctr:{
    flexDirection:'row', justifyContent:'space-between',padding:8 ,borderRadius:10,alignItems:'center',shadowColor: '#000',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,

}
});
