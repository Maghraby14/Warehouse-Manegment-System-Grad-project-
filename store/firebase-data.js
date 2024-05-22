import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update,remove } from 'firebase/database';

import firebaseConfig from '../src/firebaseConfig';
import { AuthContext } from './auth-context';

// Create a new context for Firebase data
export const FirebaseDataContext = createContext();

export const FirebaseDataProvider = ({ children }) => {
  const [firebaseData, setFirebaseData] = useState(null);
  const [firebaseRobotData, setFirebaseRobotData] = useState(null);
  const [firebaseOrderData, setFirebaseOrderData] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const updateProducts = ref(db, `Warhouses/${authCtx.userDataBaseid}/Space`);
      onValue(updateProducts, (snapshot) => {
        const data = snapshot.val();
        setFirebaseData(data);
        //console.log(data)
      });
    };

    if (authCtx.userDataBaseid) {
      fetchData();
    }
  }, [authCtx.userDataBaseid]);
  useEffect(() => {
    const fetchData = async () => {
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const updateProducts = ref(db, `Warhouses/${authCtx.userDataBaseid}/Robots`);
      onValue(updateProducts, (snapshot) => {
        const data = snapshot.val();
        setFirebaseRobotData(data);
        //console.log(data)
      });
    };

    if (authCtx.userDataBaseid) {
      fetchData();
    }
  }, [authCtx.userDataBaseid]);
  useEffect(() => {
    const fetchData = async () => {
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const updateProducts = ref(db, `Warhouses/${authCtx.userDataBaseid}/Orders`);
      onValue(updateProducts, (snapshot) => {
        const data = snapshot.val();
        setFirebaseOrderData(data);
        //console.log(data)
      });
    };

    if (authCtx.userDataBaseid) {
      fetchData();
    }
  }, [authCtx.userDataBaseid]);
  async function updateData(path, value) {
    try {
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      await update(ref(db, path), value);
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }
  async function removeData(path) {
    try {
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      await remove(ref(db, path));
    } catch (error) {
      console.error("Error removing data: ", error);
    }
  }

  return <FirebaseDataContext.Provider value={{firebaseData,updateData,removeData,firebaseRobotData,firebaseOrderData}}>{children}</FirebaseDataContext.Provider>;
};
