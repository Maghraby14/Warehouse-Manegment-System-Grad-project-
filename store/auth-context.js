import { Children, createContext, useState,useContext } from "react";

export const AuthContext = createContext({
    token:'',
    dataEntered: false,
    email:'',
    settingData:()=>{},
    isAuthenticated: false,
    authenticate:(token) =>{},
    logout:()=>{},
    getEmail:(email)=>{},
    userDataBaseid:'',
    setuserDataBaseid:(id)=>{},
    name:'',
    setName:(name)=>{},
    profuri:'',
    setimage:(uri)=>{},
    darkMode:false,
    toggledarkMode:()=>{},
    space:'',
    setSpace:(v1)=>{},
    robots:'',
    setRobots:(v2)=>{},

});
function AuthContextProvider({children}){

    const [authToken,setAuthToken] = useState();
    const [dataEntered,setDataEntered] = useState(false);
    const [email,seEmail]=useState('');
    const [userDataBaseid,setDataBaseid] = useState('');
    const [userName,setUserName] = useState('');
    const[profpic,setProfPic] = useState('');
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
    const [space,setSpaces] = useState('');
    const [robots,setRobotss] = useState('');

    function authenticate(token){
        setAuthToken(token);
    }
    function logout(){
        setAuthToken(null);
        setDataEntered(false);
       // seEmail(null);
        setDataBaseid(null);
        setName(null);
        setimage(null);
        setIsDarkModeEnabled(false);

        
        
        
    }
    function setuserDataBaseid(id){
        setDataBaseid(id);
    }
    function setimage(uri){
        setProfPic(uri);
    }
    function settingData(){
        setDataEntered(true);
    }
    function getEmail(email){
        seEmail(email);
    }
    function setName(name){
        setUserName(name);
    }
    function toggledarkMode ()  {
        setIsDarkModeEnabled((prev) => !prev);
        
  
    };
    function setSpace(v1){
        setSpaces(v1);
    }
    function setRobots(v2){
        setRobotss(v2);

    }
    const value = {
        token: authToken,
        isAuthenticated:!!authToken && dataEntered,
        authenticate:authenticate,
        logout:logout,
        dataEntered:dataEntered,
        settingData:settingData,
        getEmail:getEmail,
        email:email,
        setuserDataBaseid:setuserDataBaseid,
        getEmail:getEmail,
        userDataBaseid:userDataBaseid,
        name:userName,
        setName:setName,
        profuri:profpic,
        setimage:setimage,
        darkMode:isDarkModeEnabled,
        toggledarkMode:toggledarkMode,
        space:space,
        setSpace:setSpace,
        robots:robots,
        setRobots:setRobots


    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthContextProvider;
