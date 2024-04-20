import axios from "axios";
const api_Key = 'AIzaSyByarRuFKIB1PnDzJucObhG-vkkQlPlGNo'
const dburl = 'https://react-native-course-778b3-default-rtdb.firebaseio.com/'
export async function authenticate(mode,email,password){
    const url =`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${api_Key}`
    const response=await axios.post(url,{email: email,password: password,returnSecureToken: true})
    const token =response.data.idToken;
    //console.log(response.data)
    return token;
}
export async function createuserDatabase(name,sections,robots,email,profileuri,length,width){
   const response = await axios.post(dburl+'Warhouses.json',{Owner:name,Space:sections,Robots:robots,Email:email,uri:profileuri,length:length,width:width,Cart:''});
    const id =response.data.name;
    
    return id;
}
export async  function createUser(email, password){
   return  authenticate('signUp', email, password)
   
}
export  function login(email, password){
    return authenticate('signInWithPassword', email, password)
 }