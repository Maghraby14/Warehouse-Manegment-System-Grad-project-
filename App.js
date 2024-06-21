import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import CartContextProvider from './store/cart-context';
import { createContext, useContext } from 'react';
import IconButton from './components/ui/IconButton';
import {Ionicons,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import ProductsScreen from './screens/ProductsScreen';
import RobotsScreen from './screens/RobotsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CartScreen from './screens/CartScreen';
import ReportsScreen from './screens/ReportsScreen';
import SpaceScreen from './screens/SpaceScreen';
import TimeScreen from './screens/TimeScreen';
import OrdersScreen from './screens/OrdersScreen';
import InputData from './screens/InputData';
import ProductDetailsScreen from './screens/ProductDeatailsScreen';
import ProductContextProvider, { ProductContext } from './store/products-data';
import LanguagesScreen from './screens/LanguagesScreen';
import { useTranslation } from 'react-i18next';
import EditProfileScreen from './screens/EditProfileScreen';
import * as Notifications from 'expo-notifications';
import { initializeApp } from "firebase/app";
import firebaseConfig from './src/firebaseConfig';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { FirebaseDataContext,FirebaseDataProvider } from './store/firebase-data';
import SectionDetailsScreen from './screens/SectionDetailsScreen';
import RobotsContextProvider from './store/robots-context';
import OrdersContextProvider from './store/order-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PendingOrdersScreen from './screens/PendingOrdersScreen';
import OngoingOrdersScreen from './screens/OngoingOrdersScreen';
import ScheduldedOrdersScreen from './screens/ScheduledOrdersScreen';
import History from './screens/History';
Notifications.setNotificationHandler({
  handleNotification: async () => ({ 
      
       
          shouldShowAlert: true, 
          shouldPlaySound: true, 
          shouldSetBadge: true ,
          
       
  })
});
const Stack = createNativeStackNavigator();
const BottomsTabs = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
function SignUpStack(){
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: Colors.white,
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Signup" component={SignupScreen} 
      options={({navigation})=>({
        title:t('signUp'),
        headerRight: ({tintColor}) =>(
         <IconButton icon='language' color={tintColor} size={24} onPress={()=>{navigation.navigate('Language')}} />
         
       )
     })}
      
      />
      <Stack.Screen name='InputData' component={InputData} 
      options={({navigation})=>({
        title:t('inputData'),
          headerRight: ({tintColor}) =>(
           <IconButton icon='language' color={tintColor} size={24} onPress={()=>{navigation.navigate('Language')}} />
          ),
        headerStyle: { backgroundColor: Colors.primary100  },
        headerTintColor:Colors.white
      }
        
        
        )}
      />
      
      
      
      
    </Stack.Navigator>
  );
}
function MyTabs() {
  const authCtx = useContext(AuthContext)
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.white,
        tabBarActiveTintColor: Colors.white,
        tabBarIndicatorStyle:{backgroundColor:Colors.white}
      }}
 
    >
      <Tab.Screen 
        name="Scheduled" 
        component={ScheduldedOrdersScreen} 
        options={{ title: 'Scheduled' ,   tabBarStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  } }}
      />
      <Tab.Screen 
        name="Pending" 
        component={PendingOrdersScreen} 
        options={{ title: 'Pending' ,  tabBarStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  } }}
      />
      <Tab.Screen 
        name="Ongoing" 
        component={OngoingOrdersScreen} 
        options={{ title: 'Ongoing'  ,   tabBarStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  }}}
      />
    </Tab.Navigator>
  );
}
function Reports() {
  const authCtx = useContext(AuthContext)
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.white,
        tabBarActiveTintColor: Colors.white,
        tabBarIndicatorStyle:{backgroundColor:Colors.white}
      }}
 
    >
      <Tab.Screen 
        name="History" 
        component={History} 
        options={{ title: 'History' ,   tabBarStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  } }}
      />
      <Tab.Screen 
        name="Frequently" 
        component={History} 
        options={{ title: 'Frequently Ordered' ,  tabBarStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  } }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={({navigation})=>({
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: Colors.white,
        contentStyle: { backgroundColor: Colors.primary100 },
       
      })}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={({navigation})=>({
        title:t('login'),
         headerRight: ({tintColor}) =>(
          <IconButton icon='language' color={tintColor} size={24} onPress={()=>{navigation.navigate('Language')}} />
          
        )
      })}/>
      <Stack.Screen name="SignupStack" component={SignUpStack} options={{headerShown:false}}
      
      />
      <Stack.Screen name='Language' component={LanguagesScreen} 
      options={{
        title:t('language'),
        presentation:'modal',
        headerStyle: { backgroundColor:Colors.primary100 },
        headerTintColor: Colors.white,
      }} />
      
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  const {t} = useTranslation();
  return (
    <BottomsTabs.Navigator
      screenOptions={({navigation})=>({
        headerStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.primary100  },
        headerTintColor:Colors.white,
        tabBarStyle:{backgroundColor:authCtx.darkMode ? Colors.darksec :Colors.white},
        contentStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.primary100  },
        headerRight: ({tintColor}) =>(
          <IconButton icon='cart' color={tintColor} size={24} onPress={()=>{navigation.navigate('Cart')}} />
          
        ),
        /*
        headerLeft: ({tintColor}) =>(
          <IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout}/>
        ),*/
       
      })}
      
    >
      <BottomsTabs.Screen name="Welcome" component={WelcomeScreen} 
      options={{
        
        title:t('home'),
        tabBarLabel:t('home'),
        tabBarIcon:({color,size}) => <Ionicons name='home' size={size} color={color}/>
        
      }}
      />
      <BottomsTabs.Screen name="Products" component={ProductsScreen} 
      options={{
       
        title:t('products'),
        tabBarLabel:t('products'),
        tabBarIcon:({color,size}) => <MaterialIcons name='shopping-cart' size={size} color={color}/>
        
      }}
      />
      <BottomsTabs.Screen name="Robots" component={RobotsScreen} 
      options={{
        
        title:t('Robots'),
        tabBarLabel:t('Robots'),
        tabBarIcon:({color,size}) => <MaterialCommunityIcons name='robot-excited-outline' size={size} color={color}/>
        
      }}
      />
      <BottomsTabs.Screen name="Profile" component={ProfileScreen} 
      options={{
       
        title:t('Profile'),
        tabBarLabel:t('Profile'),
        tabBarIcon:({color,size}) => <Ionicons name='person-circle' size={size} color={color}/>
        
      }}
      />


    </BottomsTabs.Navigator>
  );
}

function Navigation() {
  const authCtx =useContext(AuthContext);
  const {t} = useTranslation();
  
  return (
    <FirebaseDataContext.Consumer>
      {(firebaseData) => (
      <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && 
      <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: Colors.white,
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
      >
        
        
        <Stack.Screen name='Home' component={AuthenticatedStack} 
      options={{
        title:t('home'),
        headerShown:false
      }}
      />
        <Stack.Screen name='Cart' component={CartScreen} 
      options={{
        title:t('cart'),
        presentation:'modal',
        headerStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  },
        headerTintColor: Colors.white,
      }} />
      <Stack.Screen name='Language' component={LanguagesScreen} 
      options={{
        title:t('language'),
        presentation:'modal',
        headerStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  },
        headerTintColor: Colors.white,
      }} />

      <Stack.Screen name='Reports' component={Reports} 
      options={{
        title:t('reports'),

      }}
      />
      <Stack.Screen name='Space' component={SpaceScreen} 
       options={({navigation})=>({
        title:t('space'),
        headerRight:({tintColor}) =>(
          <IconButton icon='cart' color={tintColor} size={24} onPress={()=>{navigation.navigate('Cart')}} />
          
        ),
        headerStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  },
      })} 
      />
      <Stack.Screen name='Time' component={TimeScreen}
      options={({navigation})=>({
        title:t('time'),
        headerRight:({tintColor}) =>(
          <IconButton icon='cart' color={tintColor} size={24} onPress={()=>{navigation.navigate('Cart')}} />
          
        ),
        headerStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  },
      })} 
      />
      <Stack.Screen name='Orders' component={MyTabs} 
       options={({navigation})=>({
        title:t('orders'),
        headerRight:({tintColor}) =>(
          <IconButton icon='cart' color={tintColor} size={24} onPress={()=>{navigation.navigate('Cart')}} />
          
        ),
        headerStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  },
      })} 
      />
      
      <Stack.Screen name='ProductDetails' component={ProductDetailsScreen} options={{
        headerStyle: { backgroundColor: authCtx.darkMode? Colors.darkprimary : Colors.primary100  },
        headerTintColor: Colors.white,
      title:t('productDetails')
    }}
      />
     <Stack.Screen name='EditProf' component={EditProfileScreen} 
      options={{
        title:t('Edit Profile'),
        presentation:'modal',
        headerStyle: { backgroundColor: authCtx.darkMode ? Colors.darkprimary:Colors.primary100  },
        headerTintColor: Colors.white,
      }}
      />
      <Stack.Screen name='SectionDetails' component={SectionDetailsScreen} options={{
        headerStyle: { backgroundColor: authCtx.darkMode? Colors.darkprimary : Colors.primary100  },
        headerTintColor: Colors.white,
      title:t('Section Details')
    }}/>

      
      </Stack.Navigator>
      }
      
      
      
    </NavigationContainer>
   )}
     </FirebaseDataContext.Consumer>
  );
}

export default function App() {
 /* const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  
 
  const updateProducts = ref(db, 'Warhouses/');
  onValue(updateProducts, (snapshot) => { const data = snapshot.val();
   /*let allProducts = [];
    data.map((item)=>{
      if(item.products){
        console.log(item)
        
      }
    })
    //products.loadProducts(allProducts);
console.log(data)});
  */
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
      <FirebaseDataProvider>
      <ProductContextProvider>
      <CartContextProvider>
<RobotsContextProvider>
  <OrdersContextProvider>
<Navigation />
</OrdersContextProvider>
</RobotsContextProvider>
      


      </CartContextProvider>
      </ProductContextProvider>
      </FirebaseDataProvider>
      </AuthContextProvider>
    </>
  );
}