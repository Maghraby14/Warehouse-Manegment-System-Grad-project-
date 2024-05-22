import { Button, Text, View , Platform,StyleSheet,Image, ImageBackground,TouchableOpacity, ScrollView} from 'react-native'; 
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Colors } from '../constants/styles';
import { AuthContext } from '../store/auth-context';
import { useContext } from 'react';
import * as Animatable from 'react-native-animatable'; // Import Animatable library
import { CartContext } from '../store/cart-context';
import { ProductContext } from '../store/products-data';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/TimeScreenComponents/ProductCard';
function TimeScreen({navigation}) { 
    const authCtx = useContext(AuthContext);
    const cartContext = useContext(CartContext);
    const prdctx = useContext(ProductContext);
    const { t } = useTranslation();
    const addToCart = () => {
        
            cartContext.addToCart(id, 1, price, img, name);
            prdctx.updateProductQuantityById(id, quantity - cartQuantity);
            navigation.navigate('Home');
        
    };
    async function requestPermissionsAsync() {
        return await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound:true,
            allowAnnouncements: true,
          },
        });
      }
      /*
    async function scheduleNotificationHandler() { 
        await requestPermissionsAsync();
        //const settings = await Notifications.getPermissionsAsync();
         Notifications.scheduleNotificationAsync({

                content: { 
                    title: 'First Notification', 
                    body: 'Body Of Notification',
                    sound:true, 
                    data: { Name: 'Maghraby' } ,
                }, 
                trigger: { seconds: 1} 
            }); 
            
        } 
        */
    

    return ( 
      <View style={{flex:1,backgroundColor:authCtx.darkMode ? Colors.darkprimary : Colors.primary100}} >
            <ScrollView>
            <View style={{flex:1,alignItems:'center',paddingBottom:30}}>
                {prdctx.products.map((section, sectionIndex) => ( section.map((product, productIndex) => (
                                   <Animatable.View key={productIndex} animation="fadeIn" duration={1000}>
                                  
                                   <ProductCard  product={product} expiry={product.expiry} />
                               </Animatable.View>
                ))))}
    
        </View>
        
        </ScrollView>
        </View>
        
        
    ); 
}

export default TimeScreen;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-around',
      width: 350,
      height: 120,
      borderRadius: 20,
      marginTop: 20,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    imgContainer: {
      marginRight: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    textContainer: {
      justifyContent: 'center',
      alignItems:'center',

    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      textAlign:'center'
    },
    name: {
      textAlign: 'center',
      fontSize: 16,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width:150,
        marginVertical:10
    },
    buttonText: {
        textAlign:'center',
        color: 'white',
        fontSize: 12,
        fontWeight:'bold'
    },
  });
  