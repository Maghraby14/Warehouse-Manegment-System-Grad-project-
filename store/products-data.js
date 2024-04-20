import axios from 'axios';
import { createContext, useState, useContext } from 'react';
import { AuthContext } from './auth-context';
import { useEffect } from 'react';
export const ProductContext = createContext({
    products: [],
    WarehouseCapacity:'',
    getCapacity:(capacity)=>{},
    removeFromProducts: (idToRemove) => {},
    loadProducts: (array) => {},
    updateProductQuantityById: (idToUpdate, newQuantity) => {},
    increaseProductQuantityById: (idToUpdate, quantityToAdd) => {},
    setExpired: (idToUpdate) => {},
    setAlarm: (idToUpdate) => {},
});

function ProductContextProvider({ children }) {
    const [Products, setProducts] = useState([]);
    const authctx = useContext(AuthContext);
    const [capacity,setCapacity] = useState('');
    
    function SetCapacity(capacity) {
        setCapacity(capacity)
    }
    async function removeFromProducts(idToRemove) {
        
        try {
            const updatedProducts = Products.map(section => section.filter(product => product.id !== idToRemove));
            
            for (let i = 0; i < updatedProducts.length; i++) {
                    await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${i}.json`, {products:updatedProducts[i]});
            }
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating product quantity:', error);
            // Handle error
            
        }
    }

    async function updateProductQuantityById(idToUpdate, newQuantity) {
        try {
            const updatedProducts = Products.map(innerArray => {
                return innerArray.map(product => {
                    if (product.id === idToUpdate) {
                        return { ...product, quantity:parseInt(newQuantity)  };
                    }
                    return product;
                });
            });
            for (let i = 0; i < updatedProducts.length; i++) {
                await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${i}.json`, {products:updatedProducts[i]});
        }
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating product quantity:', error);
            // Handle error
        }
    }
    async function setExpired(idToUpdate) {
        try {
            const updatedProducts = Products.map(innerArray => {
                return innerArray.map(product => {
                    if (product.id === idToUpdate) {
                        return { ...product, expired:true  };
                    }
                    return product;
                });
            });
            for (let i = 0; i < updatedProducts.length; i++) {
                await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${i}.json`, {products:updatedProducts[i]});
        }
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating product quantity:', error);
            // Handle error
        }
    }
    async function setAlarm(idToUpdate) {
        try {
            const updatedProducts = Products.map(innerArray => {
                return innerArray.map(product => {
                    if (product.id === idToUpdate) {
                        return { ...product, alarm:true  };
                    }
                    return product;
                });
            });
            for (let i = 0; i < updatedProducts.length; i++) {
                await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${i}.json`, {products:updatedProducts[i]});
        }
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating product quantity:', error);
            // Handle error
        }
    }


    async function increaseProductQuantityById(idToUpdate, quantityToAdd) {
        try {const updatedProducts = Products.map(innerArray => {
            return innerArray.map(product => {
                if (product.id === idToUpdate) {
                    return { ...product, quantity:parseInt(product.quantity)  + parseInt(quantityToAdd)  };
                }
                
                return product;
            });
        });
        for (let i = 0; i < updatedProducts.length; i++) {
            await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${i}.json`, {products:updatedProducts[i]});
    }
        setProducts(updatedProducts);}
        catch(err) {
            console.log('hi');
            console.log(err);

        }

        // Update the products in the database and state
       // updateProductQuantityById(idToUpdate, updatedProducts[idToUpdate].quantity);
    }

    function loadProducts(array) {
        setProducts(array);
    }

    const value = {
        products: Products,
        removeFromProducts: removeFromProducts,
        loadProducts: loadProducts,
        updateProductQuantityById: updateProductQuantityById,
        increaseProductQuantityById: increaseProductQuantityById,
        setExpired:setExpired,
        setAlarm:setAlarm,
        getCapacity:SetCapacity,
        WarehouseCapacity:capacity
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export default ProductContextProvider;
