import { View, StyleSheet,Pressable ,Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context"; 
import { useContext } from "react";
import {useTranslation} from 'react-i18next';
import i18next from "../../services/i18next";
function Option({name,value,onPress}){
    const authCtx = useContext(AuthContext);
    const {t} = useTranslation();
    return(
        <View style={styles.container}>
            <Pressable  onPress={onPress} style={({ pressed }) => [
          styles.button, {backgroundColor:authCtx.darkMode ? Colors.darkprimary: Colors.primary100},
          pressed && [styles.buttonPressed,{backgroundColor:authCtx.darkMode ? Colors.darksec2 : "#4169E1"}],
        ]}>
            <View>
            <Ionicons name = {name} size={50} color='white'/>
            </View>
            
            <View>
                <Text style={styles.text}>{t(value)}</Text>
            </View>
        </Pressable>
        </View>
    )
}
export default Option;
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
    },
    text:{
    textAlign:'center',
    color:"white"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 5,
      },
      buttonPressed: {
       
        elevation: 10, 
      },
});