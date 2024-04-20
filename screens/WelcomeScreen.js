import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import ProfileCard from '../components/WelcomeScreenComponents/ProfileCard';
import Options from '../components/WelcomeScreenComponents/Options';
import { useEffect, useState ,useContext, useLayoutEffect} from 'react';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { ProductContext } from '../store/products-data';
import * as Notifications from 'expo-notifications';
function WelcomeScreen({navigation,route}) {
  const authCtx =useContext(AuthContext);
  const [dataLoaded,setdataLoaded] =useState(false);
  
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
    console.log(authCtx.name);
  }, [authCtx.name]); 
  const products = useContext(ProductContext);
  useEffect(() => {
    const fetchData = async () => {
        try {
            
                const response = await axios.get(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authCtx.userDataBaseid}` + '/Space' + '.json');
            let allProducts = [];
            let WarehouseCapacity=0;
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i]) {
                  if (response.data[i]['products']){
                    allProducts.push(response.data[i]['products']);
                  }
                    
                  WarehouseCapacity+=parseInt(response.data[i].capacity);
                }
            }
            
            products.loadProducts(allProducts);
            products.getCapacity(WarehouseCapacity);
            //console.log(authctx.userDataBaseid)
        
            
            
        } catch (error) {
            console.log('Error fetching dataa:', error);
            products.loadProducts([]);
        }
    };
    
    fetchData();
  
}, [products.products,products.capacity,authCtx.userDataBaseid]);
  useEffect(()=>{
    const subscrition = Notifications.addNotificationReceivedListener((notification)=>{
        console.log('Notification Received')
        console.log(notification.request.content.data.product)
    })
    const subscrition1= Notifications.addNotificationResponseReceivedListener((response)=>{
        console.log('Notification Response Received')
        console.log(response)
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
  return (
    <ImageBackground source={authCtx.darkMode ? require('../assets/Frame 7 (3).png') : require('../assets/Frame 7 (1).png')} style={{flex:1}}>
      
      { dataLoaded &&   
      <View style={{alignItems:'center' }}>
      <ProfileCard name={authCtx.name} uri={authCtx.profuri}/>
      <Options />
 
      
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
});
