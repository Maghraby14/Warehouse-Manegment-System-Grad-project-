import axios from 'axios';
import { createContext, useState, useContext } from 'react';
import { AuthContext } from './auth-context';
import { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import firebaseConfig from '../src/firebaseConfig';
import { FirebaseDataContext } from './firebase-data';
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
    addNewProduct:(secindex,id,quantity,img,name,price,expiry)=>{},
    space:[],
    
});

function ProductContextProvider({ children }) {

    const [Products, setProducts] = useState([]);
    const authctx = useContext(AuthContext);
    const [capacity,setCapacity] = useState('');
    const [Space,setSpace]=useState([]);
    const {firebaseData,updateData } = useContext(FirebaseDataContext);
    //const app = initializeApp(firebaseConfig);
    //const db = getDatabase(app);
    /*const updateProducts = ref(db, 'Warhouses/' + authctx.userDataBaseid+"/Space");
    onValue(updateProducts, (snapshot) => {
      const data = snapshot.val();
      let allProducts = [];
      data.map((item)=>{
        if(item.products){
          allProducts.push(item.products);
          
        }
      })
      setProducts(allProducts);
      console.log(data)
    });*/
    function SetCapacity(capacity) {
        setCapacity(capacity)
    }
    async function removeFromProducts(idToRemove) {
        
        try {
            const updatedProducts = Products.map((section) => section.filter(product => product.id !== idToRemove));
            const sectionIndex = Products.findIndex((section) => section.some(product => product.id === idToRemove));

            
                updateData(`Warhouses/${authctx.userDataBaseid}/Space/${sectionIndex}`,{products:updatedProducts[sectionIndex]})
                    //await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${i}.json`, {products:updatedProducts[i]});
            
           // setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating product quantity:', error);
            // Handle error
            
        }
    }

    async function updateProductQuantityById(idToUpdate, newQuantity) {
        try {
            if (newQuantity === 0 ){
                removeFromProducts(idToUpdate)
            }
            else{
                let sec = 0;
                let pro = 0;
                const updatedProducts = Products.map((innerArray, index) => {
                    return innerArray.map((product, subIndex) => {
                        if (product.id === idToUpdate) {
                            pro=subIndex;
                            sec=index;
                            
                            return { ...product, quantity: parseInt(newQuantity) };
                        }
                        return product;
                    });
                });
                
            updateData(`Warhouses/${authctx.userDataBaseid}/Space/${sec}/products/${pro}`,updatedProducts[sec][pro])
                //await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${sec}/products/${pro}.json`, updatedProducts[sec][pro]);
        
            //setProducts(updatedProducts);
            }
            
        } catch (error) {
            console.error('Error updating product quantity:', error);
            // Handle error
        }
    }
    async function setExpired(idToUpdate) {
        try {
            let sec = 0;
            let pro = 0;
            const updatedProducts = Products.map((innerArray, index) => {
                return innerArray.map((product, subIndex) => {
                    if (product.id === idToUpdate) {
                        pro=subIndex;
                            sec=index;
                        return { ...product, expired:true  };
                    }
                    return product;
                });
            });
            updateData(`Warhouses/${authctx.userDataBaseid}/Space/${sec}/products/${pro}`,updatedProducts[sec][pro])
            //await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${sec}/products/${pro}.json`, updatedProducts[sec][pro]);
        
           // setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating product quantity:', error);
            // Handle error
        }
    }
    async function setAlarm(idToUpdate) {
        try {
            let sec = 0;
            let pro = 0;
            const updatedProducts = Products.map((innerArray, index) => {
                return innerArray.map((product, subIndex) => {
                    if (product.id === idToUpdate) {
                        pro=subIndex;
                            sec=index;
                        return { ...product, alarm:true  };
                    }
                    return product;
                });
            });
            updateData(`Warhouses/${authctx.userDataBaseid}/Space/${sec}/products/${pro}`,updatedProducts[sec][pro])
            //await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${sec}/products/${pro}.json`, updatedProducts[sec][pro]);
        
           // setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating product quantity:', error);
            // Handle error
        }
    }


    async function increaseProductQuantityById(idToUpdate, quantityToAdd) {
        let sec = 0;
            let pro = 0;
        try {const updatedProducts = Products.map((innerArray, index) => {
            return innerArray.map((product, subIndex) => {
                if (product.id === idToUpdate) {
                    pro=subIndex;
                    sec=index;
                    return { ...product, quantity:parseInt(product.quantity)  + parseInt(quantityToAdd)  };
                }
                
                return product;
            });
        });
        updateData(`Warhouses/${authctx.userDataBaseid}/Space/${sec}/products/${pro}`,updatedProducts[sec][pro])
        //await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${sec}/products/${pro}.json`, updatedProducts[sec][pro]);
    
    //    setProducts(updatedProducts);
    }
        catch(err) {
            console.log('hi');
            console.log(err);

        }

        // Update the products in the database and state
       // updateProductQuantityById(idToUpdate, updatedProducts[idToUpdate].quantity);
    }
    async function addNewProduct(secindex, id, quantity, img, name, price,expiry,expired,alarm,capacity,x,y,z) {
        quantity=parseInt(quantity);
        try {
          const updatedProducts = Products.map((innerArray, index) => {
            if (index === secindex) {
              
              return [...innerArray, { id, quantity, img, name, price,expiry,expired,alarm,capacity,x,y,z}];
            }
            
            return innerArray;
          });
          
          await axios.put(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${authctx.userDataBaseid}/Space/${secindex}/products.json`, updatedProducts[secindex]);
      
          //setProducts(updatedProducts);
          console.log("INPRRR"+Products);
        } catch (err) {
          console.log('hi');
          console.log(err);
        }
      }

    function loadProducts(array) {
        let allProducts = [];
        array.map((item) => {
            if (item.products) {
              allProducts.push(item.products);
            }
            else{
                allProducts.push([])
            }
            
          })
        setProducts(allProducts);
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
        WarehouseCapacity:capacity,
        addNewProduct:addNewProduct,
        space:Space,
        
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export default ProductContextProvider;
