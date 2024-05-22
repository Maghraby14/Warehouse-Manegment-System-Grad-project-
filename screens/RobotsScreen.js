import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { Colors } from '../constants/styles';
import { RobotsContext } from '../store/robots-context';
import { ProgressBar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable'; 

function RobotsScreen() {
    const authCtx = useContext(AuthContext);
    const robotCtx = useContext(RobotsContext);
    function getDateDifference(targetDate) {
        targetDate = new Date(targetDate);
        const currentDate = new Date();
        const difference = targetDate - currentDate;
        const secondsDifference = Math.floor(difference / 1000);
        const minutesDifference = Math.floor(difference / (1000 * 60));
        const hoursDifference = Math.floor(difference / (1000 * 60 * 60));
        const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
        const monthsDifference = Math.floor(daysDifference / 30);
        const yearsDifference = Math.floor(daysDifference / 365);
    
        if (yearsDifference >= 1) {
            return `${yearsDifference} year${yearsDifference !== 1 ? 's' : ''}`;
        } else if (monthsDifference >= 1) {
            return `${monthsDifference} month${monthsDifference !== 1 ? 's' : ''}`;
        } else if (daysDifference >= 1) {
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
        <View style={[styles.container, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.primary100 }]}>
            
           <ScrollView  style={{flex:1}} contentContainerStyle={{alignItems:'center',paddingBottom:10}}>
           {robotCtx.Robots.map((robot,index)=>(
            <View style={[styles.robotContainer,{backgroundColor:authCtx.darkMode ? Colors.darksec : Colors.white}]} key={index}>
            <Text style={[styles.robotName,{color:authCtx.darkMode ? Colors.white : '#000' ,marginVertical:10}]}>{robot.name}</Text>
            <Text style={[styles.robotDetail,{color:authCtx.darkMode ? Colors.white : '#000' ,marginVertical:10}]}>Time Remaining For Maintenance: {getDateDifference(robot.maintenancedate)}</Text>
            <Text style={[styles.robotDetail,{color:authCtx.darkMode ? Colors.white : '#000',marginVertical:10}]}>Condition: {robot.condition == 'f' ? "Free" : "Busy"}</Text>
            
            <View style={{width:'100%'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}}>
                <Text style={[styles.robotDetail,{color:authCtx.darkMode ? Colors.white : '#000'}]}>Battery</Text>
                <Text style={[styles.robotDetail,{color:authCtx.darkMode ? Colors.white : '#000'}]}>{robot.health} %</Text>
                </View>
            
<ProgressBar
                       progress={robot.health / 100}
                       color={robot.health>80 ? "#2acd71" :robot.health>40 ? '#e67f1d' : '#e02918'} // Change the color of the progress bar
                       style={styles.progressBar}
                   />
            </View>
            <Animatable.View animation="bounceIn" duration={1000}>
                                <TouchableOpacity onPress={()=>{}} style={[styles.button, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.primary100 }]}>
                                    <Text style={[styles.buttonText]}>{"Manual Control"}</Text>
                                </TouchableOpacity>
                            </Animatable.View>
            
        </View>
           ))}
           </ScrollView>
           
            

            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical:10
    },
    robotContainer: {
        
        padding: 10,
        margin: 5,
        borderRadius: 5,
        elevation: 3,
        width:'97%',
        flexDirection:"column" ,borderRadius:10,alignItems:'center',shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
        
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
    },
    robotName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    robotDetail: {
        fontSize: 16,
        marginBottom: 3,
    },
    progressBar: {
        height: 20, // Adjust the height of the progress bar
        borderRadius: 5, // Add border radius to make it rounded
        backgroundColor:'gray',
        marginVertical: 10,
        
    }
});

export default RobotsScreen;
