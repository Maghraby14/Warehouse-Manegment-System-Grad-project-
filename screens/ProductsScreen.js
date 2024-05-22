import { Text, ImageBackground, StyleSheet, ScrollView , View} from 'react-native';
import { AuthContext } from '../store/auth-context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Productitem from '../components/ProductComponents/Productitem';
import { ProductContext } from '../store/products-data';
import { Colors } from '../constants/styles';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import {FirebaseDataContext} from '../store/firebase-data'

function ProductsScreen() {
    const auth = useContext(AuthContext);
   const {t} = useTranslation()
   const products=useContext(ProductContext);
   const {firebaseData,updateData } = useContext(FirebaseDataContext);    

    return (
        <View style={{flex:1,backgroundColor:auth.darkMode ? Colors.darkprimary : Colors.primary100,resizeMode: 'cover',
        justifyContent: 'center', }} >
           {products.products && <ScrollView contentContainerStyle={styles.scrollView}>
               {products.products.map((section, sectionIndex) => (
                            <View key={sectionIndex} style={styles.section}>
                                {products.products[sectionIndex].length === 0 &&
                                <View style={[styles.secctr,{backgroundColor: auth.darkMode ? Colors.darksec : Colors.white}]}>
                                <Text style={[styles.sectionTitle,{color:auth.darkMode ? Colors.white : '#000'}]}>{firebaseData[sectionIndex].label}</Text>
                                 <Text style={[styles.sectionTitle,{color:auth.darkMode ? Colors.white : '#000'}]}>{t('total')}: {0}</Text>
                                </View>
                                }
                                {
                                    products.products[sectionIndex].length > 0 &&
                                 <View style={[styles.secctr,{backgroundColor: auth.darkMode ? Colors.darksec : Colors.white}]}>
                                <Text style={[styles.sectionTitle,{color:auth.darkMode ? Colors.white : '#000'}]}>{firebaseData[sectionIndex].label}</Text>
                                 <Text style={[styles.sectionTitle,{color:auth.darkMode ? Colors.white : '#000'}]}>{t('total')}: {products.products[sectionIndex].length}</Text>
                                </View>                                }
                                
                            {products.products[sectionIndex].length >0 &&
                            <View style={styles.productContainer}>
                            {section.map((product, productIndex) => (
                               <Animatable.View key={productIndex} animation="fadeIn" duration={1000}>
                               <Productitem
                                   product={product}
                               />
                           </Animatable.View>
                            ))}
                             </View>
                            }
                            
                        </View>
))}
            </ScrollView> }
            {products.products.length == 0 && <Text style={styles.sectionTitle}> No </Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    scrollView: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    section: {
        marginBottom: 20,
       
        
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

export default ProductsScreen;
