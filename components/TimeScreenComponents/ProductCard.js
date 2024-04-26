import { Button, Text, View , Platform,StyleSheet,Image, ImageBackground,TouchableOpacity, ScrollView} from 'react-native'; 
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Colors } from '../../constants/styles';
import { AuthContext } from '../../store/auth-context';
import { useContext } from 'react';
import * as Animatable from 'react-native-animatable'; // Import Animatable library
import { CartContext } from '../../store/cart-context';
import { ProductContext } from '../../store/products-data';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

function ProductCard({name,img,product}) { 
    const navigation = useNavigation();
    const prdctx = useContext(ProductContext);
    const authCtx = useContext(AuthContext);
    const { t } = useTranslation();
    const [timeRemaining, setTimeRemaining] = useState(getDateDifference(product.expiry));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(getDateDifference(product.expiry));
        }, 100);
        return () => clearInterval(interval);
    }, [product.expiry]);

    function addToCart() {
        navigation.navigate('ProductDetails', {
            product: product
        });
    }

    function removeNow() {
        prdctx.removeFromProducts(product.id);
    }

    const scheduleNotificationHandler = async (timeinSeconds, title, body, data) => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                sound: true,
                data: data,
            },
            trigger: { seconds: timeinSeconds }
        });
    }

    function getDateDifference(targetDate) {
        targetDate = new Date(targetDate);
        const currentDate = new Date();
        const difference = targetDate - currentDate;
        const secondsDifference = Math.floor(difference / 1000);
        const minutesDifference = Math.floor(difference / (1000 * 60));
        const hoursDifference = Math.floor(difference / (1000 * 60 * 60));
        const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (daysDifference >= 1) {
            return `${daysDifference} day${daysDifference !== 1 ? 's' : ''}`;
        } else if (hoursDifference >= 1) {
            return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''}`;
        } else if (minutesDifference >= 1) {
            return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''}`;
        } else {
            return `${secondsDifference} second${secondsDifference !== 1 ? 's' : ''}`;
        }
    }

    return ( 
        <View style={[styles.container,{backgroundColor: authCtx.darkMode && !timeRemaining.startsWith("-") ? Colors.darksec2 : authCtx.darkMode && timeRemaining.startsWith("-") ? '#FF004D' :  !authCtx.darkMode && !timeRemaining.startsWith("-") ? 'white' : '#FF004D'},]}>
            <View style={styles.imgContainer}>
                <Image
                    source={{uri:product.img}}
                    style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.title,{color: authCtx.darkMode && !timeRemaining.startsWith("-") ? Colors.white : authCtx.darkMode && timeRemaining.startsWith("-") ? Colors.white : !authCtx.darkMode && !timeRemaining.startsWith("-") ? 'black' : 'white'}]}>{product.name}</Text>
                <Text style={[styles.name,{color: authCtx.darkMode && !timeRemaining.startsWith("-") ? Colors.white : authCtx.darkMode && timeRemaining.startsWith("-") ? Colors.white : !authCtx.darkMode && !timeRemaining.startsWith("-") ? 'black': 'white'}]}>{timeRemaining.startsWith("-") ? 'Expired' : 'Time avaiable : '+timeRemaining }</Text>
                <Animatable.View animation="bounceIn" duration={1000}>
                    {
                        timeRemaining.startsWith("-") && 
                        <TouchableOpacity onPress={removeNow} style={[styles.button, 
                            { backgroundColor: authCtx.darkMode && !timeRemaining.startsWith("-") ? Colors.darkprimary : authCtx.darkMode && timeRemaining.startsWith("-") ? Colors.primary800 : !authCtx.darkMode && !timeRemaining.startsWith("-") ? Colors.primary100 : '#1D2B53' }]}>
                            <Text style={[styles.buttonText]}>{"Remove now" }</Text>
                        </TouchableOpacity>
                    }
                    {
                        !timeRemaining.startsWith("-") && 
                        <TouchableOpacity onPress={addToCart} style={[styles.button, 
                            { backgroundColor: authCtx.darkMode && !timeRemaining.startsWith("-") ? Colors.darkprimary : authCtx.darkMode && timeRemaining.startsWith("-") ? Colors.primary800 : !authCtx.darkMode && !timeRemaining.startsWith("-") ? Colors.primary100 : '#1D2B53' }]}>
                            <Text style={[styles.buttonText]}>{t("addToCart")}</Text>
                        </TouchableOpacity>
                    }
                </Animatable.View>
            </View>
        </View>
    ); 
}

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
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
