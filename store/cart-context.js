import { createContext, useContext, useEffect, useState } from 'react';
import { ProductContext } from './products-data';
import { AuthContext } from './auth-context';
import axios from 'axios';
export const CartContext = createContext({
    products: [],
    addToCart: (id, quantity, price) => {},
    removeFromCart: (id,quantity) => {},
    clearCart:()=>{},
});

function CartContextProvider({ children }) {
    
    const [cartProducts, setCartProducts] = useState([]);
    const prdctx = useContext(ProductContext);
    const authctx = useContext(AuthContext);
    useEffect(() =>{
        const update = async () =>{
            
                await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}.json`, {Cart:cartProducts});
            
            
            
            
    }
    update();
    
       
    },[cartProducts])
    useEffect(() =>{
        const load = async () =>{
            if (authctx.userDataBaseid){
                try {
                    console.log(response.data);
                    const response = await axios.get(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Cart.json`)
                    setCartProducts(response.data);
                        
                } catch (error) {
                    console.log('no products in cart')
                }
                
            }
            
            
    }
    load();
    
       
    },[authctx.userDataBaseid])
     function addToCart(id, quantity, price,img,name) {
        
        
            setCartProducts((current) => [...current, { id, quantity, price,img,name }]);
            

       
        
    }
    function clearCart(){
        setCartProducts([]);
    }

    async function removeFromCart(id,quantity) {
        
        try {
            setCartProducts((current) => current.filter((product) => product.id !== id));
             prdctx.increaseProductQuantityById(id, quantity);
            
            
        } catch (error) {
            console.log('hi');
            console.log(error);
        }
        
    }

    const value = {
        products: cartProducts,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        clearCart:clearCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContextProvider;
