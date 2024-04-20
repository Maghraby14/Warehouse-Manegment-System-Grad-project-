import {ImageBackground,Text,View,StyleSheet,KeyboardAvoidingView, ScrollView, Alert,Image} from 'react-native';
import Input from '../components/Auth/Input'
import Button from '../components/ui/Button';
import { useState,useContext, useTransition } from 'react';
import axios from 'axios';
import { createuserDatabase } from '../util/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';
//import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
function InputData({route}){
    const [name,setName] = useState('');
    const [numberofSections,setNumberofSections]=useState('');
    const [sections,setSections] =useState({});
    const [numberofRobots,setNumberofRobots]=useState('');
    const [robots,setRobots] =useState({});
    const [clicked,setClicked] = useState(false);
    const authCtx = useContext(AuthContext);
    const navigation = useNavigation();
    const [profilePic, setProfilePic] = useState(null);
    const [length,setLength] = useState(null);
    const [width,setWidth] = useState(null);
    const {t} = useTranslation();
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
        console.log(result.assets[0].uri);
        setProfilePic(result.assets[0].uri);
      } else {
        console.log('No image selected or result object is invalid:', result);
      }
      
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
    
    function onPresshandler(value,value2){
        
        if (name === '' || numberofRobots === '' || numberofSections==='' || length  === '' || width ===''){
            Alert.alert('Error','Please enter a name, number of Sections and number of Robots in Your Warehouse ')
        }
        else{
            console.log(value);
        const newSections = {};
        let j = parseInt(width)/parseInt(value);
        let a=0;
        let b=j;
        
        for (let i = 0; i < parseInt(value); i++) {
            newSections[i] = {
                name: `Section ${i+1}`,
                capacity: '',
                x:0,x1:parseInt(length),
                y:a,
                y1:b,
                products: {},
            };
            a+=j;
            b+=j;
        }
        setSections(newSections);
        const newRobots = {};
        for (let i = 0; i < parseInt(value2); i++) {
            newRobots[i] = {
                name: `Robot ${i+1}`,
                health: '',
                condition:'',
                maintenancedate:"",
            };
        }
        //console.log(newRobots);
        setRobots(newRobots);
        setClicked(true);

        }
        
    }
    
    
    function updateSectionshandler(value){
        setNumberofSections(value);
    }

    async function onSubmithandler() {
        console.log(sections)
        
        const id= await createuserDatabase(name,sections,robots,authCtx.email,profilePic,parseInt(length),parseInt(width));
        //console.log(id);
        //authCtx.setuserDataBaseid(id);  
        authCtx.settingData();
        authCtx.setimage(profilePic);
       
        navigation.replace('Home');




    }
    function updateName(value){
        setName(value);
    }
    // Function to handle updating the capacity of a specific section
    function handleCapacityChange(key, value) {
        setSections(prevSections => ({
            ...prevSections,
            [key]: {
                ...prevSections[key],
                label: value,
            },
        }));
    }
    function handlemaintenancedateChange(key, value) {
        setRobots(prevSections => ({
            ...prevSections,
            [key]: {
                ...prevSections[key],
                maintenancedate: value,
            },
        }));
    }
    function updateRobotNumber(value){
        setNumberofRobots(value);
    }
    function onCancelhandler(){
        setClicked(false);
        setRobots({});
        setNumberofRobots('');
        setNumberofSections(''); 
        setSections({});
    }
    /*const openImagePicker = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
    
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
    
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // You can use response.uri to display the selected image
                const source = { uri: response.uri };
                console.log('Image URI: ', source);
            }
        });
    }; */
    
    return (
        <ImageBackground source={require('../assets/Frame 7 (1).png')} style={{flex:1}}>
            <KeyboardAvoidingView style={{}} behavior="padding">
            
                <ScrollView >
                    <View style={styles.authContent}> 
                    <View style={{borderBottomWidth:1}}><Text style={{textAlign:'center',fontWeight:'bold',fontSize:18}}>{t("welcome")}</Text></View>
                    { profilePic && (
  <View style={styles.profilePicContainer}>
    <Image source={{ uri: profilePic }} style={styles.profilePic} />
  </View>

)}                  
                    <Input
                        label={t('name')}
                        onUpdateValue={updateName}
                        value={name}
                        // isInvalid={emailIsInvalid}
                    />
                    <Button onPress={pickProfilePic}>{t("enterPicture")}</Button>
                    {/*<Button onPress={openImagePicker}>Select Image</Button>*/}

                    <View style={{flexDirection:'row', flex:1 ,justifyContent:'space-between'}}>
                    <Input
                        label={t("numberOfSections")}
                        onUpdateValue={updateSectionshandler}
                        value={numberofSections}
                        keyboardType='number-pad'
                        // isInvalid={emailIsInvalid}
                        
                    />
                    <Input
                        label={t("numberOfRobots")}
                        value={numberofRobots}
                        onUpdateValue={updateRobotNumber}
                        keyboardType='number-pad'
                        // isInvalid={emailIsInvalid}
                        
                    />
                    
                    </View>
                    <>
                    <Input 
                    label={'Length of Warehouse'}
                    onUpdateValue={(value)=>{setLength(value)}}
                    value={length}
                    keyboardType={'number-pad'}

                    />
                    <Input 
                    label={'Width of Warehouse'}
                    onUpdateValue={(value)=>{setWidth(value)}}
                    value={width}
                    keyboardType={'number-pad'}

                    
                    />
                    </>
                    {!clicked && <Button onPress={() => onPresshandler(numberofSections,numberofRobots)}>{t("create")}</Button>}
                    {clicked &&
                     Object.keys(sections).map(key => (
                        <Input
                            key={key}
                            label={'Label of Section'+` ${parseInt(key)+1}`}
                            onUpdateValue={(value) => handleCapacityChange(key, value)} // Pass the section key and input value to handleCapacityChange function
                            value={sections[key].label}
                           
                            
                        />
                    )) }
                    

                    {Object.keys(robots).map(key => (
                        <Input
                            key={key}
                            label={t('maintenanceDateOfRobot')+` ${parseInt(key)+1}`}
                            onUpdateValue={(value) => handlemaintenancedateChange(key, value)} // Pass the section key and input value to handleCapacityChange function
                            value={robots[key].capacity}
                            
                            
                        />
                    ))}
                    
                    
                    
                    {clicked && <Button onPress={onSubmithandler}>{t('submit')}</Button>}
                     {clicked && <Button onPress={onCancelhandler}>{t('cancel')}</Button>}   
                    </View>
                    
                </ScrollView>
                
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

export default InputData;

const styles = StyleSheet.create({
    authContent: {
        marginVertical: 50,
        marginHorizontal: 32,
        padding: 16,
    
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        flex:1
        
    },profilePicContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 10,
        marginHorizontal:'32.5%',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        flex: 1, //
        position: 'relative', // Needed for absolute positioning
        borderWidth:2
      },
      profilePic: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    
    overflow:'hidden'
       
      },
});
