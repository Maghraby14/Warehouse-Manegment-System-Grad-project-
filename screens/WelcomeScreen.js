import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View ,PanResponder,Dimensions, FlatList} from 'react-native';
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
import FeedItem from '../components/WelcomeScreenComponents/FeedItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function WelcomeScreen({navigation,route}) {
  const authCtx =useContext(AuthContext);
  const [dataLoaded,setdataLoaded] =useState(false);
  const [alarm,setalarm] = useState(false);
   const [expired,setexpired] = useState(false);
   const [feed,setfeed] = useState([
    
   ]);
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
        if(responsee.data['uri']){
          authCtx.setimage(responsee.data['uri']);
          
        }
        else {
          authCtx.setimage('https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg');
          console.log('hi img')
        }
        
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
            if (item) {
              allProducts.push(item);
            }
            WarehouseCapacity += parseInt(item.capacity);
          })
  
          products.loadProducts(allProducts);
          products.getCapacity(WarehouseCapacity);
          //console.log(firebaseData.Space)
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
        //console.log(notification.request.content)
        setfeed(prev => [
          ...prev,
          {
              title: notification.request.content.title,
              body: notification.request.content.body,
              data: notification.request.content.data
          }
      ]);
      console.log(feed);
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
     else if(Math.floor(difference / 1000) < 0) {
        if (!product.expired && !expired) {
          product.expired = true;
          setexpired(true);
          products.setExpired(product.id);
          scheduleNotificationHandler(1, 'Product Expired', product.name + " Must Be removed From Warehouse", { product: product });
        }
      
    }
  };

  const interval = setInterval(() => {
    products.products.forEach((sec) => {
      sec.forEach((pro) => {
        getDateDifference(pro);
      });
    });
  }, 1000);

  return () => clearInterval(interval);
}, [products.products]);
const handleClearFeed = (index) => {
  setfeed(prev => prev.filter((_, idx) => idx !== index));
};


return (
  <ImageBackground source={authCtx.darkMode ? require('../assets/Frame 7 (3).png') : require('../assets/Frame 7 (1).png')} style={{ flex: 1 }}>
    {dataLoaded &&   
      <View style={{ alignItems: 'center', flex: 1 }}>
        <ProfileCard name={authCtx.name} uri={authCtx.profuri}/>
        <Options />
        <View style={styles.section}>
          <View style={[styles.secctr, { backgroundColor: authCtx.darkMode ? Colors.darksec : Colors.primary100 }]}>
            <Text style={[styles.sectionTitle, { color: authCtx.darkMode ? Colors.white : '#fff' }]}>Feed</Text>
            <TouchableOpacity onPress={() => setfeed([])} style={styles.clearAllButton}>
              <Text style={styles.clearAllButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
        

        
      </View>
    }
    {!dataLoaded && <LoadingOverlay message='Loading Your Data'/>}
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
    flex: 1,
    color: 'white',
  },
  section: {
    marginBottom: 10,
    borderWidth: 0,
    width: '95%',
    height: 70,
    marginTop: 1,
  },
  secctr: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary100,
  },
  feedContainer: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 340,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#000',
  },
  feedProduct: {
    fontSize: 16,
    marginBottom: 5,
  },
  feedBody: {
    fontSize: 14,
    color: '#000',
  },
  clearButton: {
    
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  clearButtonText: {
    color: Colors.white,
  },
  clearAllButton: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  clearAllButtonText: {
    color: Colors.white,
  },
});