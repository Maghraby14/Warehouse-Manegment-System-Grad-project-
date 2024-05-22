import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Import Animatable library
import { CartContext } from '../store/cart-context';
import { ProductContext } from '../store/products-data';
import { AuthContext } from '../store/auth-context';
import { Colors } from '../constants/styles';
import { useTranslation } from 'react-i18next';

function ProductDetailsScreen({ route }) {
    const { name, price, quantity, img, id,expiry,expired,alarm,capacity,x,y,z,Positions } = route.params.product;
    const [cartQuantity, setCartQuantity] = useState(1);
    const cartContext = useContext(CartContext);
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);
    const prdctx = useContext(ProductContext);
    const { t } = useTranslation();

    const addToCart = () => {
        if (cartQuantity > quantity) {
            Alert.alert('Invalid quantity', 'You do not have the selected quantity');
        } else {
            cartContext.addToCart(id, cartQuantity, price, img, name,expiry,expired,alarm,capacity,x,y,z,Positions.slice(0,cartQuantity));
            prdctx.updateProductQuantityById(id, quantity - cartQuantity);
            navigation.navigate('Home');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={{flex:1,backgroundColor:authCtx.darkMode ? Colors.darkprimary : Colors.primary100,resizeMode:'cover'}} >
                <Animatable.View animation="fadeIn" duration={1000} style={styles.content}>
                    <Animatable.Image animation="fadeIn" duration={1000} source={{ uri: img }} style={styles.image} />
                    <Animatable.View animation="fadeIn" duration={1000} style={[styles.ctr, { backgroundColor: authCtx.darkMode && !expired ? Colors.darksec2 : !authCtx.darkMode && !expired ? Colors.white : Colors.primary500 }]}>
                   {expired && <Animatable.Text animation="fadeIn" duration={1000} style={[styles.text, { color: authCtx.darkMode && !expired ? Colors.white : !authCtx.darkMode && !expired ? 'black' : Colors.white }]}>{"Product Expired !!"}</Animatable.Text> }
                        <Animatable.Text animation="fadeIn" duration={1000} style={[styles.text, { color: authCtx.darkMode && !expired ? Colors.white : !authCtx.darkMode && !expired ? 'black' : Colors.white }]}>{t('name')}: {name}</Animatable.Text>
                        <Animatable.Text animation="fadeIn" duration={1000} style={[styles.text, { color: authCtx.darkMode && !expired ? Colors.white : !authCtx.darkMode && !expired ? 'black' : Colors.white }]}>{t("Price")}: ${price}</Animatable.Text>
                        <Animatable.Text animation="fadeIn" duration={1000} style={[styles.text, { color: authCtx.darkMode && !expired ? Colors.white : !authCtx.darkMode && !expired ? 'black' : Colors.white }]}>{t("Quantity")}: {quantity}</Animatable.Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                            <View style={styles.quantityContainer}>
                                <Text style={[styles.quantityText, { color: authCtx.darkMode && !expired ? Colors.white : !authCtx.darkMode && !expired ? 'black' : Colors.white }]}>{t("Quantity")}:</Text>
                                <TextInput
                                    style={[styles.quantityInput, { color: authCtx.darkMode && !expired ? Colors.white : !authCtx.darkMode && !expired ? 'black' : Colors.white }]}
                                    keyboardType="numeric"
                                    value={cartQuantity.toString()}
                                    onChangeText={text => setCartQuantity(text)}
                                />
                            </View>
                            <Animatable.View animation="bounceIn" duration={1000}>
                                <TouchableOpacity onPress={addToCart} style={[styles.button, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.primary100 }]}>
                                    <Text style={[styles.buttonText]}>{t("addToCart")}</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                    </Animatable.View>
                </Animatable.View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
    },
    content: {
        flex: 1,
        margin: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ctr: {
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '90%'
    },
    image: {
        width: "100%",
        height: "40%",
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        margin: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    quantityText: {
        fontSize: 18,
        marginRight: 10,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        width: 50,
        textAlign: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight:'bold'
    },
});

export default ProductDetailsScreen;
