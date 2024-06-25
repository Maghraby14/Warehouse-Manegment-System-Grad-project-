import { Text, ImageBackground, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { useContext } from 'react';
import { ProgressBar } from 'react-native-paper';
import { Colors } from '../constants/styles';
import { ProductContext } from '../store/products-data';
import ProductCard from '../components/SpaceScreenComponents/ProductCard';
import * as Animatable from 'react-native-animatable'; // Import Animatable library
import ProfileButton from '../components/ProfileScreenComponents/ProfileButton';
import {FirebaseDataContext} from '../store/firebase-data'
function SpaceScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const prdctx = useContext(ProductContext);
    const {firebaseData,updateData } = useContext(FirebaseDataContext);
    let occupiedSpace = 0; 
    if(prdctx.products){
        prdctx.products.map((section) =>{
            section.map((product) =>{
                occupiedSpace += product.quantity
            }
            )
            
        })
    }
    
    //console.log(ocupied);
    const totalSpace = prdctx.WarehouseCapacity; // Example total space value
     // Example occupied space value

    return (
        <View style={{flex:1,backgroundColor:authCtx.darkMode ? Colors.darkprimary : Colors.primary100,resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center' }} >
            <ScrollView contentContainerStyle={{paddingBottom:40}}>
                
                <View style={{flex:1}}>
                <View  style={styles.sectionn}>
                <Text style={[styles.sectionTitlee,{color:authCtx.darkMode ? Colors.white : '#fff'},{textAlign:'center'}]}>{'Sections'} </Text>
                                <View style={[styles.secctr,{backgroundColor: authCtx.darkMode ? Colors.darksec : Colors.sec100},{flexWrap:'wrap'}]}>
                                {firebaseData.map((data, index) => (
                                    <ProfileButton key={index} onPress={()=>{
                                        navigation.navigate('SectionDetails',{
                                            section:data
                                        })
                                    }}>{data.label}</ProfileButton>
                                    
                                    ))}
                                    
                                 </View>   
                </View>    
                <View  style={styles.section}>
                                <View style={[styles.secctr,{backgroundColor: authCtx.darkMode ? Colors.darksec : Colors.white}]}>
                                <Text style={[styles.sectionTitle,{color:authCtx.darkMode ? Colors.white : '#000'}]}>{'Warehouse'} </Text>
                                 <Text style={[styles.sectionTitle,{color:authCtx.darkMode ? Colors.white : '#000'}]}>{'Total'}: {totalSpace}</Text>
                                 </View>   
                </View>
               <ProgressBar
                       progress={occupiedSpace / totalSpace}
                       color={Colors.primary500} // Change the color of the progress bar
                       style={styles.progressBar}
                   />
               <View style={styles.spaceIndicatorContainer}>
                   <View style={{flexDirection:'row'}}>
                   <View style={[styles.spaceIndicator, { backgroundColor: Colors.primary500 }]} />
                   <Text style={styles.spaceIndicatorText}>{occupiedSpace} Boxes Occupied</Text>
                   </View>
                   <View style={{flexDirection:'row'}}>
                   <View style={[styles.spaceIndicator, { backgroundColor: 'gray' }]} />
                   <Text style={styles.spaceIndicatorText}>{totalSpace-occupiedSpace} Boxes Free</Text>
                   </View>
                   
               </View>
               <View style={{flex:1,alignItems:'center'}}>
               { prdctx.products.map((section, sectionIndex) => (
    prdctx.products[sectionIndex] && section.map((product, productIndex) => (
        <Animatable.View key={productIndex} animation="fadeIn" duration={1000}>
            <ProductCard product={product} />
        </Animatable.View>
    ))
))}
               </View>
               

                </View>
                
            </ScrollView>
        </View>
    );
}

export default SpaceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    warehouseTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color:'white'
    },
    progressBarContainer: {
        marginTop: 10,
        borderRadius: 20,
        width: 350,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBar: {
        height: 20, // Adjust the height of the progress bar
        borderRadius: 5, // Add border radius to make it rounded
        backgroundColor:'gray',
        marginTop: 10,
        
    },
    spaceIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        width: 350,
    },
    spaceIndicator: {
        width: 20,
        height: 20,
        marginRight: 5,
        borderRadius: 5,
    },
    spaceIndicatorText: {
        fontSize: 14,
        marginLeft: 5,
        color:'white'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    sectionTitlee: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    section: {
        marginBottom: 10       
        
    },
    sectionn: {
        marginBottom: 10,
        flexDirection:'column' ,
        flex:1   ,
        paddingHorizontal:20   
        
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
    marginTop:20,
    }

});
