import { createContext, useContext, useEffect, useState } from 'react';
import { ProductContext } from './products-data';
import { AuthContext } from './auth-context';
import axios from 'axios';
import { FirebaseDataContext } from './firebase-data';
export const RobotsContext = createContext({
    Robots: [],
    setData:(data)=>{},
    
});

function RobotsContextProvider({ children }) {
    
    const [Robots, setRobots] = useState([]);
    const authctx = useContext(AuthContext);
   const {updateData} = useContext(FirebaseDataContext);
    
    
    
    
    
   
 function setData(data){
    setRobots(data)
 }
    const value = {
        Robots: Robots,
        setData:setData
    };

    return <RobotsContext.Provider value={value}>{children}</RobotsContext.Provider>;
}

export default RobotsContextProvider;
