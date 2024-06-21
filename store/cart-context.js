import { createContext, useContext, useEffect, useState } from 'react';
import { ProductContext } from './products-data';
import { AuthContext } from './auth-context';
import axios from 'axios';
import { FirebaseDataContext } from './firebase-data';
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
    const {firebaseData,updateData } = useContext(FirebaseDataContext);
    
    useEffect(() => {
        const update = async () => {
            try {
                const requestBody =  { Cart: cartProducts };
                updateData(`Warhouses/${authctx.userDataBaseid}`,requestBody)
                //await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}.json`, requestBody);
            } catch (error) {
                console.log('Error updating cart:', error);
            }
        };
    
        update();
    }, [cartProducts]);
    
    useEffect(() => {
        const load = async () => {
            try {
                if (authctx.userDataBaseid) {
                    const [response] = await Promise.all([
                        axios.get(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Cart.json`),
                    ]);
                    setCartProducts(response.data || []);
                }
            } catch (error) {
                console.log('Error loading cart products:', error);
                setCartProducts([]);
            }
        };
    
        load();
    }, [authctx.userDataBaseid]);
    
    function addToCart(id, quantity, price, img, name,expiry,expired,alarm,capacity,x,y,z,Positions) {
        let productInCart = cartProducts.some((product) => product.id === id);
    
        if (productInCart) {
            const updatedCart = cartProducts.map((product) => {
                if (product.id === id) {
                    return { ...product, quantity: parseInt(quantity) + parseInt(product.quantity),  Positions: [...product.Positions, ...Positions] };
                } else {
                    return product;
                }
            });
            setCartProducts(updatedCart);
        } else {
            setCartProducts((current) => [...current, { id, quantity, price, img, name,expiry,expired,alarm,capacity,x,y,z,Positions:Positions }]);
        }
    
        //console.log(cartProducts);
    }
    
    function clearCart(){
        setCartProducts([]);
    }

    async function removeFromCart(id,quantity,img,name,price,expiry,expired,alarm,capacity,x,y,z,Positions) {
        let productinpro = false;
        prdctx.products.map((sec)=>{
            sec.map((product)=>{
                if(product.id === id) {
                    productinpro = true;
                    return ;
                }
            })
        })
        try {
            if (productinpro){
                setCartProducts((current) => current.filter((product) => product.id !== id));
             prdctx.increaseProductQuantityById(id, quantity,Positions);
            }
            else{
                for (let secindex = 0; secindex < firebaseData.length; secindex++) {
                    //console.log(firebaseData[0].y1)
                    if (firebaseData[secindex].y < y && firebaseData[secindex].y1 > y){
                        setCartProducts((current) => current.filter((product) => product.id !== id));
                      console.log('IN CART' , secindex, id, quantity, img, name, price)
                      prdctx.addNewProduct(secindex, id, quantity, img, name, price,expiry,expired,alarm,capacity,x,y,z,Positions);
                      break; // Stop the loop once the condition is met
                    }
        
                  }
                  
                  
                
            }
            
            
            
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
