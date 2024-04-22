import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { CartContext } from '../store/cart-context';
import { AuthContext } from '../store/auth-context';
import { Colors } from '../constants/styles';
function CartScreen() {
    const { products, removeFromCart, clearCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const authCtx = useContext(AuthContext);
    // Calculate total price
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
    const handleShipNow = () => {
        // Implement shipping logic here

        Alert.alert('Ship Now', 'Shipping process will be initiated.');
    };

    // Handle "Clear Cart" button press
    const handleClearCart = () => {
        // Clear cart
        clearCart();
    };

    return (
        <ImageBackground source={authCtx.darkMode ? require('../assets/Frame 7 (3).png'):require('../assets/Frame 7 (1).png')} style={{ flex: 1 }}>
            <View style={[styles.container]}>
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
                                    onPress={() => removeFromCart(product.id,product.quantity,product.img,product.name,product.price,product.expiry,product.expired,product.alarm,product.capacity,product.x,product.y,product.z)}
                                >
                                    <Text style={styles.removeButtonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <View style={styles.totalContainer}>
                            <Text style={[styles.totalText,{color:authCtx.darkMode ? "white" : 'black'}]}>Total: ${totalPrice}</Text>
                            <TouchableOpacity style={[styles.shipNowButton,{backgroundColor:authCtx.darkMode ? Colors.darksec2 : Colors.primary100}]} onPress={handleShipNow}>
                                <Text style={styles.buttonText}>Ship Now</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
                                <Text style={styles.buttonText}>Clear Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    },
    clearCartButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default CartScreen;
