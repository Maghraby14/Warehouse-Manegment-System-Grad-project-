import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert, ScrollView ,KeyboardAvoidingView} from 'react-native';
import { CartContext } from '../store/cart-context';
import { AuthContext } from '../store/auth-context';
import { Colors } from '../constants/styles';
import { OrdersContext } from '../store/order-context';
import Button from '../components/EditProfileComponents/Button';
import { FirebaseDataContext } from '../store/firebase-data';
function CartScreen() {
    const { products, removeFromCart, clearCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const authCtx = useContext(AuthContext);
    const ordersCtx = useContext(OrdersContext); 
    const {updateData} = useContext(FirebaseDataContext);

     // Calculate total price
    const [ordernow,setOrderNow] = useState(false);
    const [schedule,setSchedule] = useState(false);
    const [name,setName] = useState(''); 
    const [date,setDate] = useState(''); 
    const [time,setTime] = useState(''); 
    useEffect(() => {
        // Function to generate a random 10-digit number
        const generateRandomNumber = () => {
          const min = Math.pow(10, 9); // Minimum 10-digit number
          const max = Math.pow(10, 10) - 1; // Maximum 10-digit number
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
    
        // Set the initial state for 'name' with a random 10-digit number
        setName(generateRandomNumber().toString());
      }, [ordernow]);
    useEffect(()=>{
        const calculateTotalPrice = () => {
            let total = 0;
            products.forEach((product) => {
                if(product){
                    total += product.price * product.quantity;
                }
                
            });
            setTotalPrice(total);
        };
        calculateTotalPrice();
    },[products]);

    // Handle "Ship Now" button press
    const handleShipNow = (name) => {
        // Implement shipping logic here
        ordersCtx.addOrderNow(name,new Date(),products);
        clearCart();
        Alert.alert('Ship Now', 'Shipping process will be initiated.');
    };
    const handleShip = (name, date, time) => {
        // Combine date and time into a single datetime value
        const combinedDateTime = new Date(`${date}T${time}`);
    
        // Check if combinedDateTime is a valid Date object
        if (!isNaN(combinedDateTime.getTime())) {
            // Date is valid, proceed with shipping logic
            ordersCtx.addOrderSchedule(name, `${date}T${time}`, products);
            clearCart();
            Alert.alert('Ship Now', 'Shipping process will be initiated.');
        } else {
            // Date is invalid, show error message
            Alert.alert('Invalid Date', 'Please enter a valid date and time.');
        }
    };

    // Handle "Clear Cart" button press
    const handleClearCart = () => {
        // Clear cart
        clearCart();
    };

    return (
        <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
        <View style={{flex:1,backgroundColor:authCtx.darkMode ? Colors.darkprimary : Colors.primary100,paddingVertical:40}} >
            <ScrollView style={[styles.container]}>
                {products.length === 0 ? (
                    <Text style={styles.emptyText}>Your cart is empty.</Text>
                ) : (
                    <>
                        {products.map((product, index) => (
                            <View key={index} style={[styles.product,{backgroundColor:authCtx.darkMode ?  Colors.darksec2 : Colors.white,borderColor: authCtx.darkMode ? "#555" : '#ccc'}]}>
                                <Image source={{ uri: product.img }} style={styles.productImage} />
                                <View style={styles.productDetails}>
                                    <Text style={{color:authCtx.darkMode ? "white" : 'black'}}>Name: {product.name}</Text>
                                    <Text style={{color:authCtx.darkMode ? "white" : 'black'}}>Price: ${product.price}</Text>
                                    <Text style={{color:authCtx.darkMode ? "white" : 'black'}}>Quantity: {product.quantity}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => removeFromCart(product.id,product.quantity,product.img,product.name,product.price,product.expiry,product.expired,product.alarm,product.capacity,product.x,product.y,product.z,product.Positions)}
                                >
                                    <Text style={styles.removeButtonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {
                            !ordernow && !schedule &&
                            <View style={styles.totalContainer}>
                            <Text style={[styles.totalText,{color:authCtx.darkMode ? "white" : 'black'}]}>Total: ${totalPrice}</Text>
                           
                            <TouchableOpacity style={[styles.shipNowButton,{backgroundColor:authCtx.darkMode ? Colors.darksec2 : Colors.sec100}]} onPress={()=>{setOrderNow(true)}}>
                                <Text style={styles.buttonText}>Order Now</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.shipNowButton,{backgroundColor:authCtx.darkMode ? Colors.darksec2 : Colors.sec100}]} onPress={()=>{setSchedule(true)}}>
                                <Text style={styles.buttonText}>Schedule An Order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
                                <Text style={styles.buttonText}>Clear Cart</Text>
                            </TouchableOpacity>
                        </View>

                        }
                        {
                            ordernow && !schedule &&
<View style={{flex:1,alignItems:'center'}}>
<Button animation='zoomIn' duration={300} easing='ease-in' style={{width:'90%'}}
                    label={'Order Number'} color={authCtx.darkMode ? 'white' :'white'} value={name}  onupdate={(name)=>{setName(name)}}
                    ViewStyle={{flexDirection:'row',justifyContent:'space-evenly'}}
                    TOStyle={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.sec100 }]} OnPress={()=>{setOrderNow(false); handleShipNow(name)}} textStyle={styles.changeNameText}
                    TOStyle2={[styles.changeNameBtn, { backgroundColor: Colors.primary500 }]} OnPress2={()=>{setOrderNow(false); }} textStyle2={styles.changeNameText}
                    txt='Ship Now'
                    txt2={'Cancel'}
                    />
</View>
                            
                        }
                        {
                            !ordernow && schedule &&
<View style={{flex:1,alignItems:'center'}}>
<Button animation='zoomIn' duration={300} easing='ease-in' style={{width:'90%'}}
                    label={'Order Number'} color={authCtx.darkMode ? 'white' :'white'} value={name}  onupdate={(name)=>{setName(name)}}
                    ViewStyle={{flexDirection:'row',justifyContent:'space-evenly'}}
                    TOStyle={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.sec100 }]} OnPress={()=>{setSchedule(false); handleShip(name,date,time)}} textStyle={styles.changeNameText}
                    TOStyle2={[styles.changeNameBtn, { backgroundColor: Colors.primary500 }]} OnPress2={()=>{setSchedule(false); }} textStyle2={styles.changeNameText}
                    txt='Ship Now'
                    label2={'Enter Date'} value2={date} onupdate2={(date)=>{setDate(date)}}
                    label3={'Enter Time'} value3={time} onupdate3={(time)=>{setTime(time)}}
                    txt2={'Cancel'}
                    />
</View>
                            
                        }
                        
                    </>
                )}
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    changeNameBtn: {
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    changeNameText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    product: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
    },
    removeButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    removeButtonText: {
        color: 'white',
    },
    totalContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    shipNowButton: {
       // backgroundColor: '#27BEF2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        width:'60%',alignItems:'center'
    },
    clearCartButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width:'60%',alignItems:'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default CartScreen;
