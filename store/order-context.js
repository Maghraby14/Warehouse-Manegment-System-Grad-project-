import { createContext, useContext, useEffect, useState } from 'react';
import { ProductContext } from './products-data';
import { AuthContext } from './auth-context';
import axios from 'axios';
import { FirebaseDataContext } from './firebase-data';
export const OrdersContext = createContext({
    Scheduled: [],
    Pending:[],
    Ongoing:[],
    setData:(response)=>{},
    addOrderNow:(number,time,Products)=>{},
    addOrderSchedule:(number,time,Products)=>{},
    setOn:(idToUpdate)=>{}
});

function OrdersContextProvider({ children }) {
    const authctx = useContext(AuthContext);
    const {firebaseData,updateData,removeData } = useContext(FirebaseDataContext);
    const [scheduled, setScheduled] = useState([]);
    const [pending, setPending] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [positions,setPositions] = useState([]);
    const [now,setNow] = useState([]);
    useEffect(() => {
        if (ongoing.length === 0 && pending.length > 0) {
            const nonOngoingOrder = pending.find(order => !order.ongoing);
            if (nonOngoingOrder) {
                const updatedPending = pending.filter(order => order.name !== nonOngoingOrder.name);
                const updatedOngoing = [...ongoing, nonOngoingOrder];
                let positionss = [];
                nonOngoingOrder.products.forEach(product => {
                    product.Positions.forEach(position => {
                        const updatedPosition = { ...position, handled: false }; // Add the 'handled' property
                    positionss.push(updatedPosition);
                    });
                });
                 // Log the positions array here
                setPending(updatedPending);
                setOngoing(updatedOngoing);
                console.log(updatedOngoing,'yak')
                setPositions(positionss);
                
                updateData(`Warhouses/${authctx.userDataBaseid}/Orders`, { Ongoing: updatedOngoing, Pending: updatedPending,Positions:positionss });
            }
        }
        if(ongoing){
            if(ongoing[0])
            {
                if(ongoing[0].ongoing)
                {
                    updateData(`Warhouses/${authctx.userDataBaseid}/Orders`, { Ongoing:[] });
                }
            }
        }
      
    }, [pending, ongoing]);
    useEffect(() => {
        if (now.length === 0 && positions.length > 0 && ongoing.length>0) {
            const nonHandledOrder = positions.find(order => !order.handled);
            if (nonHandledOrder) {

                const updatedPositions = positions.map((p) => {
                    if (p.x === nonHandledOrder.x && p.y === nonHandledOrder.y && p.z === nonHandledOrder.z) {
                        return undefined; // or return null or any other placeholder value
                    } else {
                        return p;
                    }
                }).filter(p => p!== undefined)
                const updatedNow = [...now, {...nonHandledOrder,done:false}];
                
                setPositions(updatedPositions);
                setNow(updatedNow);
                
                
                updateData(`Warhouses/${authctx.userDataBaseid}/Orders`, { Positions:updatedPositions,now:updatedNow });
            }
        }

      if (positions.length === 0 && ongoing.length>0 && now.length===0){
        setOngoing([])
        updateData(`Warhouses/${authctx.userDataBaseid}/Orders`, {Ongoing:[]});
      }
      if(now){
        if(now[0])
        {
            if(now[0].done){
                updateData(`Warhouses/${authctx.userDataBaseid}/Orders`, { now:[] });
            }
            
        }
        
        
      }
      
    }, [positions,now]); 
    function setData(response){
        if(response.Ongoing){
            setOngoing(response.Ongoing);
        }
        else{
            setOngoing([])
        }
        if(response.Pending){
            setPending(response.Pending);
        }
        else{
            setPending([])
        }
        if(response.Scheduled){
            setScheduled(response.Scheduled);
        }
        else{
            setScheduled([])
        }
        if(response.Positions){
            setPositions(response.Positions);
        }
        else{
            setPositions([])
        }
        if(response.now){
            setNow(response.now);
        }
        else{
            setNow([])
        }
    }
   async function addOrderNow(number,time,products){
   setPending(prev => {
        // Update the pending state with the new order
        const updatedPending = [
            ...prev,
            {
                name: number,
                time: time,
                products: products,
                ongoing:false
            }
        ];
         // Log the updated pending state
        updateData(`Warhouses/${authctx.userDataBaseid}/Orders`,{Pending:updatedPending})
        return updatedPending;
    });
    
   }
   async function addOrderSchedule(number,time,products){
    setScheduled(prev => {
        // Update the pending state with the new order
        const updatedScheduled = [
            ...prev,
            {
                name: number,
                time: time,
                products: products,
                on:false
            }
        ];
         // Log the updated pending state
        updateData(`Warhouses/${authctx.userDataBaseid}/Orders`,{Scheduled:updatedScheduled})
        return updatedScheduled;
    });
   }
   async function setOn(idToUpdate) {
    try {
        const updatedProducts = scheduled.map((order, index) => {
            if (idToUpdate === order.name) {
                // Update the 'on' property of the matching order
                return {
                    ...order,
                    on: true,
                    ongoing:false
                };
            }
            // Return the original order if it doesn't match the ID
            return order;
        });

        // Remove the order with the matching ID from the 'Scheduled' array
        

        // Remove the order with the matching ID from the 'Scheduled' array
        const updatedPendingOrder = updatedProducts.find(order => order.name === idToUpdate);

        // Add the found order to the 'Pending' array
        const updatedPending = updatedPendingOrder ? [...pending, updatedPendingOrder] : pending;

        const updatedScheduled = updatedProducts.filter(order => order.name !== idToUpdate);

        // Update the state with the modified 'Scheduled' and 'Pending' arrays
        setScheduled(updatedScheduled);
        setPending(updatedPending);

        // Update the data in Firebase
        updateData(`Warhouses/${authctx.userDataBaseid}/Orders`, { Pending: updatedPending, Scheduled: updatedScheduled });
    } catch (error) {
        console.error('Error updating product quantity:', error);
        // Handle error
    }
}

    const value = {
        Scheduled: scheduled,
        Pending: pending,
        Ongoing: ongoing,
        setData:setData,
        addOrderNow:addOrderNow,
        addOrderSchedule:addOrderSchedule,
        setOn:setOn
        
    };

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export default OrdersContextProvider;
