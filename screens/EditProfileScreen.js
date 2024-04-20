import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Animated,ScrollView,Linking, Pressable, Alert,KeyboardAvoidingView,Platform  } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { useContext, useEffect, useState } from 'react';
import { Colors } from '../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons , Zocial} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Input from '../components/Auth/Input';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { login,createUser } from '../util/auth';
import Button from '../components/EditProfileComponents/Button';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import LoadingOverlayy from '../components/ui/LoadingOverlayy';
function EditProfileScreen() {
    const authCtx = useContext(AuthContext);
    const fadeAnim = new Animated.Value(0);
    const [changeNamePressed,setChangeNamePressed] = useState(false);
    const [changeEmailPressed,setChangeEmailPressed] = useState(false);
    const [changePasswordPressed,setChangePasswordPressed] = useState(false);
    const [changeSectionPressed,setChangeSectionPressed] = useState(false);
    const [changeRobotsPressed,setChangeRobotsPressed] = useState(false);
    const [name,setName] = useState(authCtx.name);
    const [email,setEmail] = useState(authCtx.email);
    const [password,setPassword] = useState('');
    const [passTrue,setPassTrue]= useState(false);
    const [Sections,setSections] = useState([]);
    const [Robots,SetRobots] = useState([]);
    
    const [token,settoken] = useState(null);
    function updateNameValueHandler(value){
        setName(value);
    }
    function updatePasswordValueHandler(value){
        setPassword(value);
    }
    function updateEmailValueHandler(value){
        setEmail(value)
    }
    async function  updateEmailInSystem(){
        try {
           const token = await login(authCtx.email, password);
           setPassTrue(true);
           settoken(token);

        } catch (error) {
            Alert.alert('Error',"Wrong Password Entered",[] )
        }
        
    }
    async function updateEmail(){
        try {
            const api_Key = 'AIzaSyByarRuFKIB1PnDzJucObhG-vkkQlPlGNo'
            const newToken = await createUser(email, password);
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${api_Key}`, {idToken: newToken,email: email,returnSecureToken:true });
           await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authCtx.userDataBaseid}/.json`, {Email:email});
           const responsee = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${api_Key}`,{ idToken: token});
          authCtx.authenticate(response.data.idToken);
          authCtx.getEmail(email);
         setChangeEmailPressed(false);
    
        } catch (error) {
            Alert.alert('Error','Email Already Exists')
        }
    }
    async function updateNameInDatabase(name){
        try{
        await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authCtx.userDataBaseid}.json`,{"Owner":name});
        authCtx.setName(name);}
        catch(err){
            console.log('Eroor Changing Name');
        }
    }
    const pickProfilePic = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }
      
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
      
          if (result && result.assets && result.assets.length > 0 && result.assets[0].uri) {
           // console.log(result.assets[0].uri);
            try{
                await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authCtx.userDataBaseid}.json`,{"uri":result.assets[0].uri});
            }
            catch(err){
                console.log("Error in uploading image");
            }
            authCtx.setimage(result.assets[0].uri);

          } else {
            console.log('No image selected or result object is invalid:', result);
          }
          
        } catch (error) {
          console.error('Error picking image:', error);
        }
      };
      async function changePasswordHandler(){
        try {
        const api_Key = 'AIzaSyByarRuFKIB1PnDzJucObhG-vkkQlPlGNo'
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${api_Key}`,{requestType:'PASSWORD_RESET',email:authCtx.email});
        Alert.alert('Success', 'A Password Reset Request was sent To your Email');
        authCtx.logout();
        Linking.openURL('googlegmail://').catch((err) => console.error('An error occurred: ', err));
        } catch (error) {
        Alert.alert('Error',"Couldn\'t Reset Password")    
        }
       
       
      }
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);
    async function fetchSectionData(){
        const response = await axios.get(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authCtx.userDataBaseid}` + '/Space' + '.json');
        const data = response.data;
        const sections = [];
        for(let i = 0; i < data.length; i++){
            if(data[i]==null){continue;}
            else{
                sections.push(data[i]);
            }
            
        }
        setSections(sections);
    
       
    }
    async function fetchRobotsData(){
        const response = await axios.get(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authCtx.userDataBaseid}` + '/Robots' + '.json');
        const data = response.data;
        const robots = [];
        for(let i = 0; i < data.length; i++){
            if(data[i]==null){continue;}
            else{
                robots.push(data[i]);
            }
            
        }
        SetRobots(robots);

    }
    function removeRobots(name){
        SetRobots(prevRobots => {
            return prevRobots.filter(robot => robot.name !== name)
        })
    }
    function updateRobots(name, value) {
        SetRobots(prev => (
            prev.map(robot => {
                if (robot.name === name) {
                    return {
                        ...robot,
                        maintenancedate: value
                    };
                }
                return robot;
            })
        ));
       
    }
    function updateSections(name, value) {
        setSections(prev => (
            prev.map(section => {
                if (section.name === name) {
                    return {
                        ...section,
                        capacity: value
                    };
                }
                return section;
            })
        ));
       
    }
    function removeSection(name){
        setSections(prevSections => {
            return prevSections.filter(section => section.name !== name)
        })
    }
    async function updateSectionsInDb(){
        let update = true;
        let updatee = true;
        Sections.map((section)=>{
            let ocupied = 0;
            if(section.products){
                section.products.map(product =>{
                    
                   // console.log(typeof(parseInt(product.capacity)))
                    ocupied+=parseInt(product.capacity)
                })
            }
            
        if(ocupied > section.capacity){
            update=false;
        }
        })
        Sections.map(section => {
            if(!section.capacity){
                updatee=false;
            }
        })

        if(update && updatee){
            const response = await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authCtx.userDataBaseid}/.json`, {'Space': Sections});
            Alert.alert('Success','Section data updated Succesfully updated successfully');
            authCtx.setSpace(Sections.length);
            console.log(authCtx.space);
            setSections([])
            setChangeSectionPressed(false);
        }
        
        else if(!update){
            Alert.alert('Error',"Can't Update Products Capacity as the Entered Capacity Is Lower Than the Ocupied Capacity");
        }
        else if(!updatee){
            Alert.alert('Error',"Can't Leave Section with no Capacity");
        }
        

}
async function updateRobotsInDb(){
     let update=true;
     Robots.map(robot=>{
        if(!robot.maintenancedate)
        {
            Alert.alert('Error',"Can't leave Robots Maintenence Date Empty")
            update=false;
        }
        else{
            let [day,month,year] = robot.maintenancedate.split('-');
            let date = new Date(year,month-1,day);

            if(isNaN(date.getTime())){
                Alert.alert('Error',"Invalid Date Entered")
                update=false;
            }
            
            
            
        }
     })
     if(update){
        try {
            const response = await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authCtx.userDataBaseid}/.json`, {'Robots': Robots});
            Alert.alert('Success','Robot data updated Succesfully updated successfully');
            authCtx.setRobots(Robots.length)
            SetRobots([]);
            setChangeRobotsPressed(false);
        } catch (error) {
            Alert.alert('Error',"Something went wrong");
            
        }
     }
}
    return (
        <KeyboardAvoidingView style={{ flex: 1,resizeMode: 'cover' }} behavior='padding'>
        <ImageBackground source={authCtx.darkMode ? require('../assets/Frame 7 (3).png') : require('../assets/Frame 7 (1).png')} style={{ flex: 1 }}>
           <ScrollView>
            
            <View style={styles.container}>
                <Animated.View style={[styles.profileContainer, { backgroundColor: authCtx.darkMode ? Colors.darksec : 'white', opacity: fadeAnim }]}>
                    <View style={styles.profilePicContainer}>
                        <Image source={{ uri: authCtx.profuri }} style={styles.profilePic} />
                        {!changeNamePressed && !changeSectionPressed && !changeEmailPressed&&
                        <TouchableOpacity style={styles.changeProfileBtn} onPress={pickProfilePic}><Icon name="camera" size={24} color={authCtx.darkMode ? 'white' : 'white'} /></TouchableOpacity>
                        }
                        
                    </View>
                    <Text style={[styles.title, { color: authCtx.darkMode ? 'white' : 'black' }]}>{authCtx.name}</Text>
                    {changeNamePressed && 
                    <Button animation='zoomIn' duration={300} easing='ease-in' style={{width:'90%'}}
                    label={'Enter New Name'} color={authCtx.darkMode ? 'white' :'black'} value={name}  onupdate={updateNameValueHandler}
                    ViewStyle={{flexDirection:'row',justifyContent:'space-evenly'}}
                    TOStyle={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.sec100 }]} OnPress={()=>{setChangeNamePressed(false);updateNameInDatabase(name);}} textStyle={styles.changeNameText}
                    TOStyle2={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.primary500 : Colors.primary500 }]}
                    OnPress2={()=>{setChangeNamePressed(false)}}
                    textStyle2={styles.changeNameText}
                    txt='Submit'
                    txt2='Cancel'
                    />}
                    {!changeNamePressed && !changeSectionPressed &&
                        <Animatable.View animation="bounceIn" duration={1000}>
                        <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.primary100 }]}onPress={()=>{setChangeNamePressed(true)}}><Text style={styles.changeNameText}>Change Name</Text></TouchableOpacity></Animatable.View>
                    } 
                    
                </Animated.View>
                <Animated.View style={[styles.profileContainer, { backgroundColor: authCtx.darkMode ? Colors.darksec : 'white', opacity: fadeAnim }]}>
                    <Text style={[styles.title, { color: authCtx.darkMode ? 'white' : 'black' }]}>Edit</Text>
                {changeEmailPressed && !passTrue &&
                     <Animatable.View  animation='zoomIn' duration={300} easing='ease-in' style={{width:'90%'}}>
                    <Input label={'Enter Your Password'} color= {authCtx.darkMode ? 'white' :'black'}value={password} onUpdateValue={updatePasswordValueHandler} secure/* isInvalid={emailsDontMatch}*/ />
                    <View  style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                    <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.sec100 }]}
                onPress={()=>{
                    
                    //updateNameInDatabase(name);
                    updateEmailInSystem()
                    
                
                }}
                >
                    <Text style={styles.changeNameText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.primary500 : Colors.primary500 }]}
                onPress={()=>{setChangeEmailPressed(false);  setPassTrue(false);  setPassword('')}}
                >
                    <Text style={styles.changeNameText}>Cancel</Text>
                </TouchableOpacity>
                    </View>
                    </Animatable.View >
                    
                    }
                    {changeEmailPressed && passTrue && <>
                        <Animatable.View  animation='zoomIn' duration={300} easing='ease-in' style={{width:'90%'}}>
                    <Input label={'Enter Your New Email'} color= {authCtx.darkMode ? 'white' :'black'}value={email} onUpdateValue={updateEmailValueHandler}/* keyboardType="email-address" isInvalid={emailsDontMatch}*/ />
                    <View  style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                    <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.sec100 }]}
                onPress={()=>{
                    
                    //updateNameInDatabase(name);
                    updateEmail();
                    
                    
                    
                
                }}
                >
                    <Text style={styles.changeNameText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.primary500 : Colors.primary500 }]}
                onPress={()=>{setChangeEmailPressed(false); setPassTrue(false);  setPassword('')}}
                >
                    <Text style={styles.changeNameText}>Cancel</Text>
                </TouchableOpacity>
                    </View>
                    </Animatable.View >
                    
                    
                    </>}



                    {!changeEmailPressed && !changeSectionPressed && !changeRobotsPressed &&
                    <Animatable.View animation="flipInX" duration={1000} style={{width:"100%"}}>
                    <TouchableOpacity style={[styles.chbutton, { backgroundColor: authCtx.darkMode ? Colors.darksec2 : Colors.primary100 }]} onPress={()=>{
                        setChangeEmailPressed(true) 
                    }}>
                    <Icon name="envelope" size={18} color={authCtx.darkMode ? 'white' : 'white'} style={{ position: 'absolute', left: 10,top:10, alignSelf: 'center' }} />
                    <Text style={[styles.buttonText, { color: authCtx.darkMode ? 'white' : 'white', marginLeft: 15,textAlign:'left' }]}>Change Email</Text>
                    </TouchableOpacity>
                    </Animatable.View>
                    }
                    {!changeEmailPressed && !changePasswordPressed && !changeSectionPressed && !changeRobotsPressed &&
                     <Animatable.View animation="flipInX" duration={1000} style={{width:"100%"}}>
                     <TouchableOpacity  style={[styles.chbutton, { backgroundColor: authCtx.darkMode ? Colors.darksec2 : Colors.primary100 }]}
                     onPress={changePasswordHandler}
                     >
                     <Icon name="lock" size={20} color={authCtx.darkMode ? 'white' : 'white'} style={{ position: 'absolute', left: 10,top:10, alignSelf: 'center' }} />
                     <Text style={[styles.buttonText, { color: authCtx.darkMode ? 'white' : 'white', marginLeft: 15 ,textAlign:'left'}]}>Change Password</Text>
                     </TouchableOpacity>
                     </Animatable.View>
                    
                    }
                
                    {!changeEmailPressed && !changePasswordPressed && !changeSectionPressed && !changeRobotsPressed && false &&
                       
                    <Animatable.View animation="flipInX" duration={1000} style={{width:"100%"}}>
                    <TouchableOpacity  style={[styles.chbutton, { backgroundColor: authCtx.darkMode ? Colors.darksec2 : Colors.primary100 }]}
                    onPress={()=>{setChangeSectionPressed(true);
                    fetchSectionData();
                    
                    }}
                    >
                    <Zocial name="myspace" size={20} color={authCtx.darkMode ? 'white' : 'white'} style={{ position: 'absolute', left: 7,top:5, alignSelf: 'center' }} />
                    <Text style={[styles.buttonText, { color: authCtx.darkMode ? 'white' : 'white', marginLeft: 15,textAlign:'left' }]}>Change Sections Data</Text>
                    </TouchableOpacity>
                    </Animatable.View>
                    }
                    {!changeEmailPressed && !changePasswordPressed && changeSectionPressed && Sections.length > 0 &&
                       
                       <>
                      <Animatable.View animation='zoomIn' duration={300} easing='ease-in' style={{ width: '90%' }}>
                            {
                                Sections.map((section) => (
                                    <View key={section.name} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ flex: 5 }}>
                                            <Input
                                                label={section.name}
                                                color={authCtx.darkMode ? 'white' : 'black'}
                                                value={section.capacity.toString()} // Accessing capacity directly from the section object
                                                onUpdateValue={(value) => { updateSections(section.name, value) }} // Passing section name and new value to updateSections function
                                                keyboardType='number-pad'
                                            />
                                        </View>
                                        <TouchableOpacity style={{ flex: 1, backgroundColor: '#ff6347', marginLeft: 10, marginTop:20,borderRadius: 5, alignItems: 'center', justifyContent: 'center', height: 30 }}
                                    onPress={
                                        () => {
                                            if(section.products) {
                                                Alert.alert(
                                                    'Warning',
                                                    "If Secitons is removed this will remove all products in it",
                                                    [
                                                        {
                                                            text: 'Cancel',
                                                            
                                                            style: 'destructive',
                                                        },
                                                        {
                                                            text: 'Remove Anyway',
                                                            onPress: () => removeSection(section.name),
                                                            style: 'cancel',
                                                        },
                                                    ],
                                                    { cancelable: false }
                                                );
                                            }
                                            else{
                                                removeSection(section.name);
                                            }
                                            
                                        }

                                    }
                                        >
                                            <Icon name='remove' color='white' />
                                        </TouchableOpacity>
                                    </View>
                                ))
                                
                            }
                            <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: '#46aa6c' }]}
                                    onPress={() => {
                                       
                                        const newSection = {
                                            name: 'Section ' +`${parseInt(Sections[Sections.length - 1].name.slice(8)) +1}`  ,
                                            capacity: '',
                                            products:[]
                                        }
                                        setSections(prevSections => {
                                            return [...prevSections, newSection]
                                        })

                                    }}
                                >
                                    <Text style={styles.changeNameText}>Add Section</Text>
                                </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.sec100 }]}
                                    onPress={() => {
                                        updateSectionsInDb();
                                        
                                        
                                    }}
                                >
                                    <Text style={styles.changeNameText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.primary500 : Colors.primary500 }]}
                                    onPress={() => {setChangeSectionPressed(false);   setSections([])}}
                                >
                                    <Text style={styles.changeNameText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>

                                        
                                        
                                        </>
                       }
                       {changeSectionPressed && Sections.length === 0 &&
                       <>
                       <LoadingOverlayy message='Loading Sections Data'/>
                       </>}
                       {changeRobotsPressed && Robots.length === 0 &&
                       <>
                       <LoadingOverlayy message='Loading Robots Data'/>
                       </>}

                       {!changeEmailPressed && !changePasswordPressed && !changeSectionPressed && changeRobotsPressed&& Robots.length > 0 &&<>
                        <Animatable.View animation='zoomIn' duration={300} easing='ease-in' style={{ width: '90%' }}>
                            {
                                Robots.map((robot) => (
                                    <View key={robot.name} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ flex: 5 }}>
                                            <Input
                                                label={'Maintenance date of ' + robot.name }
                                                color={authCtx.darkMode ? 'white' : 'black'}
                                                value={robot.maintenancedate.toString()} // Accessing capacity directly from the section object
                                                onUpdateValue={(value) => { updateRobots(robot.name, value) }} // Passing section name and new value to updateSections function
                                               
                                            />
                                        </View>
                                        <TouchableOpacity style={{ flex: 1, backgroundColor: '#ff6347', marginLeft: 10, marginTop:20,borderRadius: 5, alignItems: 'center', justifyContent: 'center', height: 30 }}
                                    onPress={
                                        () => {
                                          if(robot.maintenancedate)
                                          {
                                            Alert.alert(
                                                'Warning',
                                                "If Secitons is removed this will remove all products in it",
                                                [
                                                    {
                                                        text: 'Cancel',
                                                        style:'destructive'
                                                    },
                                                    {
                                                        text: 'Remove Anyway',
                                                        onPress: () => removeRobots(robot.name),
                                                        style: 'cancel',
                                                    },
                                                ],
                                                { cancelable: false }
                                            );

                                          }
                                          else{
                                            removeRobots(robot.name);
                                          }
                                               
                                            
                                            
                                            
                                        }

                                    }
                                        >
                                            <Icon name='remove' color='white' />
                                        </TouchableOpacity>
                                    </View>
                                ))
                                
                            }
                            <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: '#46aa6c' }]}
                                    onPress={() => {
                                       
                                        const newRobot = {
                                            name: 'Robot ' +`${parseInt(Robots[Robots.length - 1].name.slice(6)) +1}`  ,
                                            health: '',
                                            maintenancedate:'',
                                            condition:''
                                        }
                                        SetRobots(prevRobots => {
                                            return [...prevRobots, newRobot]
                                        })

                                    }}
                                >
                                    <Text style={styles.changeNameText}>Add Robot</Text>
                                </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.sec100 }]}
                                    onPress={() => {
                                        updateRobotsInDb();
                                        
                                        
                                    }}
                                >
                                    <Text style={styles.changeNameText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.changeNameBtn, { backgroundColor: authCtx.darkMode ? Colors.primary500 : Colors.primary500 }]}
                                    onPress={() => {setChangeRobotsPressed(false);   SetRobots([])}}
                                >
                                    <Text style={styles.changeNameText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>
                       
                       </>

                       }


                    
                    { !changeEmailPressed && !changePasswordPressed && !changeSectionPressed && !changeRobotsPressed &&
                    <Animatable.View animation="flipInX" duration={1000} style={{width:"100%"}}>
                    <TouchableOpacity style={[styles.chbutton, { backgroundColor: authCtx.darkMode ? Colors.darksec2 : Colors.primary100 }]} onPress={()=>{setChangeRobotsPressed(true); fetchRobotsData();}}>
                    <MaterialCommunityIcons name="robot-dead-outline" size={20} color={authCtx.darkMode ? 'white' : 'white'} style={{ position: 'absolute', left: 10,top:9, alignSelf: 'center' }} />
                    <Text style={[styles.buttonText, { color: authCtx.darkMode ? 'white' : 'white', marginLeft: 15,textAlign:'left' }]}>Change Robots Data</Text>
                    </TouchableOpacity>
                    </Animatable.View>
                    }
                    
                    
                    </Animated.View>
                    
                       
            </View>
            
           </ScrollView>
            
        </ImageBackground>
        </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginBottom:100,
       
        padding: 20,

        
    },pressed: {
        opacity: 0.7,
      },
    profileContainer: {
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
        width: '100%',
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
    profilePicContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    profilePic: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        overflow: 'hidden',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
    },
    changeProfileBtn: {
        position: 'absolute',
        bottom: -5,
        right: -2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 5,
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
    buttonContainer: {
        marginTop: 20,
         flex:1,
         borderWidth:10
    },
    button: {
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    chbutton: {
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        width:'100%'
    },
});

export default EditProfileScreen;
