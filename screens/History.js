import { useContext } from 'react';
import {Text, View,StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { AuthContext } from '../store/auth-context';
import { Colors } from '../constants/styles';
import * as Animatable from 'react-native-animatable'; 
import { OrdersContext } from '../store/order-context';
import ProductItem from '../components/OrderScreenComponents/Productitem';
function History({navigation}){
    const authCtx = useContext(AuthContext)
    const ordersCtx = useContext(OrdersContext);
    return (
        <View style={{flex:1,backgroundColor:authCtx.darkMode ? Colors.darkprimary : Colors.primary100,resizeMode: 'cover',alignItems:'center',flexDirection:'column',justifyContent:'center' }} >
            <ScrollView contentContainerStyle={styles.scrollView}>
            <View  style={{flex:1,marginBottom:10}}>
            <View style={[styles.secctr,{backgroundColor: authCtx.darkMode ? Colors.darksec : Colors.white}]}>
                                <Text style={[styles.sectionTitle,{color:authCtx.darkMode ? Colors.white : '#000'}]}>Orders</Text>
                                 <Text style={[styles.sectionTitle,{color:authCtx.darkMode ? Colors.white : '#000'}]}>{'Total'}: {ordersCtx.Ongoing.length}</Text>
            </View>
            </View>
            {
              ordersCtx.Ongoing && 
              
                
              ordersCtx.hist.map((order, index) => (
                <View style={[styles.orderContainer,{backgroundColor:authCtx.darkMode ? Colors.darksec : Colors.primary100}]} key={index}>
                    <Text style={styles.orderText}>Order ID: {order.name}</Text>
                    <Text style={styles.orderText}>To be ordered: {order.time.split("T")[0]}</Text>
                    <Text style={styles.orderText}>At: {order.time.split("T")[1].split(".")[0]}</Text>
                    {
                        order.products.map((product,index)=>(
                            <View key={index} style={{flex:1}}>
                                <ProductItem product={product} />
                            </View>
                        ))
                    }
                     <View style={{alignItems:'center',margin:10}}>
                    
            </View>
                </View>
            ))
                
               
              
              
            }
            
    
    </ScrollView>
    </View>
    )
}
const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    scrollView: {
        paddingVertical: 20,
        paddingHorizontal:10,
        
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
    width:'100%'
    
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical:10
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight:'bold'
    }, orderContainer: {
        
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
       marginHorizontal:30,
       shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
        
    },
    orderText: {
        fontSize: 16,
        marginVertical: 2,
      color:'white'
    },
});

export default History;
