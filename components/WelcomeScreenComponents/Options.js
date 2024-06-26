import { View, StyleSheet,Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../store/auth-context';
import { useState,useContext } from 'react';
import {Ionicons} from "@expo/vector-icons";
import axios  from "axios";
import Option from "./Option";
import { createUser } from "../../util/auth";
import { RobotsContext } from "../../store/robots-context";
import { FirebaseDataContext } from "../../store/firebase-data";
function Options(){
    const auth = useContext(AuthContext);
    const navigation = useNavigation();
    const {firebaseRobotData} = useContext(FirebaseDataContext);
    const r = useContext(RobotsContext);
   async function navigatetoReports(){
   /* 
await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${auth.userDataBaseid}.json`, {
  "Email": "mnelmaghraby145@gmail.com",
  "Owner": "Mohamed El-Maghraby",
  
  "Capacity":300,
  "height":3,
  "length":10,
  "width":10,
  "Robots": [

    {
      "condition": "f",
      "health": 100,
      "maintenancedate": "2024-07-01",
      "name": "Robot 1"
    },
   
  ],
  "Space": [
    
    {
      "capacity": 150,
      "name": "Section 1",
      "label":'Monazefat',
      "x": 0,
      "y": 0,
      "x1": 10,
      "y1": 5, 
      'free':[
        {
          "x": 9,
          "y": 4,
          "z": 2
        },
        {
          "x": 9,
          "y": 4,
          "z": 1
        },
        {
          "x": 9,
          "y": 4,
          "z": 0
        },
        {
          "x": 9,
          "y": 3,
          "z": 2
        },
        {
          "x": 9,
          "y": 3,
          "z": 1
        },
        {
          "x": 9,
          "y": 3,
          "z": 0
        },
        {
          "x": 9,
          "y": 2,
          "z": 2
        },
        {
          "x": 9,
          "y": 2,
          "z": 1
        },
        {
          "x": 9,
          "y": 2,
          "z": 0
        },
        {
          "x": 9,
          "y": 1,
          "z": 2
        },
        {
          "x": 9,
          "y": 1,
          "z": 1
        },
        {
          "x": 9,
          "y": 1,
          "z": 0
        },
        {
          "x": 9,
          "y": 0,
          "z": 2
        },
        {
          "x": 9,
          "y": 0,
          "z": 1
        },
        {
          "x": 9,
          "y": 0,
          "z": 0
        },
        {
          "x": 8,
          "y": 4,
          "z": 2
        },
        {
          "x": 8,
          "y": 4,
          "z": 1
        },
        {
          "x": 8,
          "y": 4,
          "z": 0
        },
        {
          "x": 8,
          "y": 3,
          "z": 2
        },
        {
          "x": 8,
          "y": 3,
          "z": 1
        },
        {
          "x": 8,
          "y": 3,
          "z": 0
        },
        {
          "x": 8,
          "y": 2,
          "z": 2
        },
        {
          "x": 8,
          "y": 2,
          "z": 1
        },
        {
          "x": 8,
          "y": 2,
          "z": 0
        },
        {
          "x": 8,
          "y": 1,
          "z": 2
        },
        {
          "x": 8,
          "y": 1,
          "z": 1
        },
        {
          "x": 8,
          "y": 1,
          "z": 0
        },
        {
          "x": 8,
          "y": 0,
          "z": 2
        },
        {
          "x": 8,
          "y": 0,
          "z": 1
        },
        {
          "x": 8,
          "y": 0,
          "z": 0
        },
        {
          "x": 7,
          "y": 4,
          "z": 2
        },
        {
          "x": 7,
          "y": 4,
          "z": 1
        },
        {
          "x": 7,
          "y": 4,
          "z": 0
        },
        {
          "x": 7,
          "y": 3,
          "z": 2
        },
        {
          "x": 7,
          "y": 3,
          "z": 1
        },
        {
          "x": 7,
          "y": 3,
          "z": 0
        },
        {
          "x": 7,
          "y": 2,
          "z": 2
        },
        {
          "x": 7,
          "y": 2,
          "z": 1
        },
        {
          "x": 7,
          "y": 2,
          "z": 0
        },
        {
          "x": 7,
          "y": 1,
          "z": 2
        },
        {
          "x": 7,
          "y": 1,
          "z": 1
        },
        {
          "x": 7,
          "y": 1,
          "z": 0
        },
        {
          "x": 7,
          "y": 0,
          "z": 2
        },
        {
          "x": 7,
          "y": 0,
          "z": 1
        },
        {
          "x": 7,
          "y": 0,
          "z": 0
        },
        {
          "x": 6,
          "y": 4,
          "z": 2
        },
        {
          "x": 6,
          "y": 4,
          "z": 1
        },
        {
          "x": 6,
          "y": 4,
          "z": 0
        },
        {
          "x": 6,
          "y": 3,
          "z": 2
        },
        {
          "x": 6,
          "y": 3,
          "z": 1
        },
        {
          "x": 6,
          "y": 3,
          "z": 0
        },
        {
          "x": 6,
          "y": 2,
          "z": 2
        },
        {
          "x": 6,
          "y": 2,
          "z": 1
        },
        {
          "x": 6,
          "y": 2,
          "z": 0
        },
        {
          "x": 6,
          "y": 1,
          "z": 2
        },
        {
          "x": 6,
          "y": 1,
          "z": 1
        },
        {
          "x": 6,
          "y": 1,
          "z": 0
        },
        {
          "x": 6,
          "y": 0,
          "z": 2
        },
        {
          "x": 6,
          "y": 0,
          "z": 1
        },
        {
          "x": 6,
          "y": 0,
          "z": 0
        },
        {
          "x": 5,
          "y": 4,
          "z": 2
        },
        {
          "x": 5,
          "y": 4,
          "z": 1
        },
        {
          "x": 5,
          "y": 4,
          "z": 0
        },
        {
          "x": 5,
          "y": 3,
          "z": 2
        },
        {
          "x": 5,
          "y": 3,
          "z": 1
        },
        {
          "x": 5,
          "y": 3,
          "z": 0
        },
        {
          "x": 5,
          "y": 2,
          "z": 2
        },
        {
          "x": 5,
          "y": 2,
          "z": 1
        },
        {
          "x": 5,
          "y": 2,
          "z": 0
        },
        {
          "x": 5,
          "y": 1,
          "z": 2
        },
        {
          "x": 5,
          "y": 1,
          "z": 1
        },
        {
          "x": 5,
          "y": 1,
          "z": 0
        },
        {
          "x": 5,
          "y": 0,
          "z": 2
        },
        {
          "x": 5,
          "y": 0,
          "z": 1
        },
        {
          "x": 5,
          "y": 0,
          "z": 0
        },
        {
          "x": 4,
          "y": 4,
          "z": 2
        },
        {
          "x": 4,
          "y": 4,
          "z": 1
        },
        {
          "x": 4,
          "y": 4,
          "z": 0
        },
        {
          "x": 4,
          "y": 3,
          "z": 2
        },
        {
          "x": 4,
          "y": 3,
          "z": 1
        },
        {
          "x": 4,
          "y": 3,
          "z": 0
        },
        {
          "x": 4,
          "y": 2,
          "z": 2
        },
        {
          "x": 4,
          "y": 2,
          "z": 1
        },
        {
          "x": 4,
          "y": 2,
          "z": 0
        },
        {
          "x": 4,
          "y": 1,
          "z": 2
        },
        {
          "x": 4,
          "y": 1,
          "z": 1
        },
        {
          "x": 4,
          "y": 1,
          "z": 0
        },
        {
          "x": 4,
          "y": 0,
          "z": 2
        },
        {
          "x": 4,
          "y": 0,
          "z": 1
        },
        {
          "x": 4,
          "y": 0,
          "z": 0
        },
        {
          "x": 3,
          "y": 4,
          "z": 2
        },
        {
          "x": 3,
          "y": 4,
          "z": 1
        },
        {
          "x": 3,
          "y": 4,
          "z": 0
        },
        {
          "x": 3,
          "y": 3,
          "z": 2
        },
        {
          "x": 3,
          "y": 3,
          "z": 1
        },
        {
          "x": 3,
          "y": 3,
          "z": 0
        },
        {
          "x": 3,
          "y": 2,
          "z": 2
        },
        {
          "x": 3,
          "y": 2,
          "z": 1
        },
        {
          "x": 3,
          "y": 2,
          "z": 0
        },
        {
          "x": 3,
          "y": 1,
          "z": 2
        },
        {
          "x": 3,
          "y": 1,
          "z": 1
        },
        {
          "x": 3,
          "y": 1,
          "z": 0
        },
        {
          "x": 3,
          "y": 0,
          "z": 2
        },
        {
          "x": 3,
          "y": 0,
          "z": 1
        },
        {
          "x": 3,
          "y": 0,
          "z": 0
        },
        {
          "x": 2,
          "y": 4,
          "z": 2
        },
        {
          "x": 2,
          "y": 4,
          "z": 1
        },
        {
          "x": 2,
          "y": 4,
          "z": 0
        },
        {
          "x": 2,
          "y": 3,
          "z": 2
        },
        {
          "x": 2,
          "y": 3,
          "z": 1
        },
        {
          "x": 2,
          "y": 3,
          "z": 0
        },
        {
          "x": 2,
          "y": 2,
          "z": 2
        },
        {
          "x": 2,
          "y": 2,
          "z": 1
        },
        {
          "x": 2,
          "y": 2,
          "z": 0
        },
        {
          "x": 2,
          "y": 1,
          "z": 2
        },
        {
          "x": 2,
          "y": 1,
          "z": 1
        },
        {
          "x": 2,
          "y": 1,
          "z": 0
        },
        {
          "x": 2,
          "y": 0,
          "z": 2
        },
        {
          "x": 2,
          "y": 0,
          "z": 1
        },
        {
          "x": 2,
          "y": 0,
          "z": 0
        },
        {
          "x": 1,
          "y": 4,
          "z": 2
        },
        {
          "x": 1,
          "y": 4,
          "z": 1
        },
        {
          "x": 1,
          "y": 4,
          "z": 0
        },
        {
          "x": 1,
          "y": 3,
          "z": 2
        },
        {
          "x": 1,
          "y": 3,
          "z": 1
        },
        {
          "x": 1,
          "y": 3,
          "z": 0
        },
        {
          "x": 1,
          "y": 2,
          "z": 2
        },
        {
          "x": 1,
          "y": 2,
          "z": 1
        },
        {
          "x": 1,
          "y": 2,
          "z": 0
        },
        {
          "x": 1,
          "y": 1,
          "z": 2
        },
        {
          "x": 1,
          "y": 1,
          "z": 1
        },
        {
          "x": 1,
          "y": 1,
          "z": 0
        },
        {
          "x": 1,
          "y": 0,
          "z": 2
        },
        {
          "x": 1,
          "y": 0,
          "z": 1
        },
        {
          "x": 1,
          "y": 0,
          "z": 0
        },
      
      ],     
      "products": [
        {
          "capacity": 5,
          "expiry": "2025-05-01",
          "id": 66667,
          "img": "https://m.media-amazon.com/images/I/71Vu-hZRGmL.__AC_SX300_SY300_QL70_ML2_.jpg",
          "name": "Tide",
          "price": 10,
          "quantity": 10,
          "expired":false,
          'alarm':false,
          "Positions":[
            {
              "x": 0,
              "y": 3,
              "z": 0
            },
            {
              "x": 0,
              "y": 2,
              "z": 2
            },
            {
              "x": 0,
              "y": 2,
              "z": 1
            },
            {
              "x": 0,
              "y": 2,
              "z": 0
            },
            {
              "x": 0,
              "y": 1,
              "z": 2
            },
            {
              "x": 0,
              "y": 1,
              "z": 1
            },
            {
              "x": 0,
              "y": 1,
              "z": 0
            },
            {
              "x": 0,
              "y": 0,
              "z": 2
            },
            {
              "x": 0,
              "y": 0,
              "z": 1
            },
            {
              "x": 0,
              "y": 0,
              "z": 0
            }
          ],
          "x": 5,
          "y": 1,
          "z":5,
        },
        {
          "capacity": 5,
          "expiry": "2025-05-01",
          "id": 77777,
          "img": "https://m.media-amazon.com/images/I/818txN0aHvL.__AC_SX300_SY300_QL70_ML2_.jpg",
          "name": "oxi",
          "price": 50,
          "quantity": 5,
          "expired":false,
          'alarm':false,
          "x": 6,
          "y": 3,
          "z":5,
          "Positions":[
            {
              "x": 0,
              "y": 4,
              "z": 2
            },
            {
              "x": 0,
              "y": 4,
              "z": 1
            },
            {
              "x": 0,
              "y": 4,
              "z": 0
            },
            {
              "x": 0,
              "y": 3,
              "z": 2
            },
            {
              "x": 0,
              "y": 3,
              "z": 1
            },
          ]
        }
      ]
    },
    {
      "capacity": 150,
      "label":'Food',
      "name": "Section 2",
      "x": 0,
      "y": 5,
      "x1": 10,
      "y1": 10,
      'free':[
        {
          "x": 9,
          "y": 9,
          "z": 2
        },
        {
          "x": 9,
          "y": 9,
          "z": 1
        },
        {
          "x": 9,
          "y": 9,
          "z": 0
        },
        {
          "x": 9,
          "y": 8,
          "z": 2
        },
        {
          "x": 9,
          "y": 8,
          "z": 1
        },
        {
          "x": 9,
          "y": 8,
          "z": 0
        },
        {
          "x": 9,
          "y": 7,
          "z": 2
        },
        {
          "x": 9,
          "y": 7,
          "z": 1
        },
        {
          "x": 9,
          "y": 7,
          "z": 0
        },
        {
          "x": 9,
          "y": 6,
          "z": 2
        },
        {
          "x": 9,
          "y": 6,
          "z": 1
        },
        {
          "x": 9,
          "y": 6,
          "z": 0
        },
        {
          "x": 9,
          "y": 5,
          "z": 2
        },
        {
          "x": 9,
          "y": 5,
          "z": 1
        },
        {
          "x": 9,
          "y": 5,
          "z": 0
        },
        {
          "x": 8,
          "y": 9,
          "z": 2
        },
        {
          "x": 8,
          "y": 9,
          "z": 1
        },
        {
          "x": 8,
          "y": 9,
          "z": 0
        },
        {
          "x": 8,
          "y": 8,
          "z": 2
        },
        {
          "x": 8,
          "y": 8,
          "z": 1
        },
        {
          "x": 8,
          "y": 8,
          "z": 0
        },
        {
          "x": 8,
          "y": 7,
          "z": 2
        },
        {
          "x": 8,
          "y": 7,
          "z": 1
        },
        {
          "x": 8,
          "y": 7,
          "z": 0
        },
        {
          "x": 8,
          "y": 6,
          "z": 2
        },
        {
          "x": 8,
          "y": 6,
          "z": 1
        },
        {
          "x": 8,
          "y": 6,
          "z": 0
        },
        {
          "x": 8,
          "y": 5,
          "z": 2
        },
        {
          "x": 8,
          "y": 5,
          "z": 1
        },
        {
          "x": 8,
          "y": 5,
          "z": 0
        },
        {
          "x": 7,
          "y": 9,
          "z": 2
        },
        {
          "x": 7,
          "y": 9,
          "z": 1
        },
        {
          "x": 7,
          "y": 9,
          "z": 0
        },
        {
          "x": 7,
          "y": 8,
          "z": 2
        },
        {
          "x": 7,
          "y": 8,
          "z": 1
        },
        {
          "x": 7,
          "y": 8,
          "z": 0
        },
        {
          "x": 7,
          "y": 7,
          "z": 2
        },
        {
          "x": 7,
          "y": 7,
          "z": 1
        },
        {
          "x": 7,
          "y": 7,
          "z": 0
        },
        {
          "x": 7,
          "y": 6,
          "z": 2
        },
        {
          "x": 7,
          "y": 6,
          "z": 1
        },
        {
          "x": 7,
          "y": 6,
          "z": 0
        },
        {
          "x": 7,
          "y": 5,
          "z": 2
        },
        {
          "x": 7,
          "y": 5,
          "z": 1
        },
        {
          "x": 7,
          "y": 5,
          "z": 0
        },
        {
          "x": 6,
          "y": 9,
          "z": 2
        },
        {
          "x": 6,
          "y": 9,
          "z": 1
        },
        {
          "x": 6,
          "y": 9,
          "z": 0
        },
        {
          "x": 6,
          "y": 8,
          "z": 2
        },
        {
          "x": 6,
          "y": 8,
          "z": 1
        },
        {
          "x": 6,
          "y": 8,
          "z": 0
        },
        {
          "x": 6,
          "y": 7,
          "z": 2
        },
        {
          "x": 6,
          "y": 7,
          "z": 1
        },
        {
          "x": 6,
          "y": 7,
          "z": 0
        },
        {
          "x": 6,
          "y": 6,
          "z": 2
        },
        {
          "x": 6,
          "y": 6,
          "z": 1
        },
        {
          "x": 6,
          "y": 6,
          "z": 0
        },
        {
          "x": 6,
          "y": 5,
          "z": 2
        },
        {
          "x": 6,
          "y": 5,
          "z": 1
        },
        {
          "x": 6,
          "y": 5,
          "z": 0
        },
        {
          "x": 5,
          "y": 9,
          "z": 2
        },
        {
          "x": 5,
          "y": 9,
          "z": 1
        },
        {
          "x": 5,
          "y": 9,
          "z": 0
        },
        {
          "x": 5,
          "y": 8,
          "z": 2
        },
        {
          "x": 5,
          "y": 8,
          "z": 1
        },
        {
          "x": 5,
          "y": 8,
          "z": 0
        },
        {
          "x": 5,
          "y": 7,
          "z": 2
        },
        {
          "x": 5,
          "y": 7,
          "z": 1
        },
        {
          "x": 5,
          "y": 7,
          "z": 0
        },
        {
          "x": 5,
          "y": 6,
          "z": 2
        },
        {
          "x": 5,
          "y": 6,
          "z": 1
        },
        {
          "x": 5,
          "y": 6,
          "z": 0
        },
        {
          "x": 5,
          "y": 5,
          "z": 2
        },
        {
          "x": 5,
          "y": 5,
          "z": 1
        },
        {
          "x": 5,
          "y": 5,
          "z": 0
        },
        {
          "x": 4,
          "y": 9,
          "z": 2
        },
        {
          "x": 4,
          "y": 9,
          "z": 1
        },
        {
          "x": 4,
          "y": 9,
          "z": 0
        },
        {
          "x": 4,
          "y": 8,
          "z": 2
        },
        {
          "x": 4,
          "y": 8,
          "z": 1
        },
        {
          "x": 4,
          "y": 8,
          "z": 0
        },
        {
          "x": 4,
          "y": 7,
          "z": 2
        },
        {
          "x": 4,
          "y": 7,
          "z": 1
        },
        {
          "x": 4,
          "y": 7,
          "z": 0
        },
        {
          "x": 4,
          "y": 6,
          "z": 2
        },
        {
          "x": 4,
          "y": 6,
          "z": 1
        },
        {
          "x": 4,
          "y": 6,
          "z": 0
        },
        {
          "x": 4,
          "y": 5,
          "z": 2
        },
        {
          "x": 4,
          "y": 5,
          "z": 1
        },
        {
          "x": 4,
          "y": 5,
          "z": 0
        },
        {
          "x": 3,
          "y": 9,
          "z": 2
        },
        {
          "x": 3,
          "y": 9,
          "z": 1
        },
        {
          "x": 3,
          "y": 9,
          "z": 0
        },
        {
          "x": 3,
          "y": 8,
          "z": 2
        },
        {
          "x": 3,
          "y": 8,
          "z": 1
        },
        {
          "x": 3,
          "y": 8,
          "z": 0
        },
        {
          "x": 3,
          "y": 7,
          "z": 2
        },
        {
          "x": 3,
          "y": 7,
          "z": 1
        },
        {
          "x": 3,
          "y": 7,
          "z": 0
        },
        {
          "x": 3,
          "y": 6,
          "z": 2
        },
        {
          "x": 3,
          "y": 6,
          "z": 1
        },
        {
          "x": 3,
          "y": 6,
          "z": 0
        },
        {
          "x": 3,
          "y": 5,
          "z": 2
        },
        {
          "x": 3,
          "y": 5,
          "z": 1
        },
        {
          "x": 3,
          "y": 5,
          "z": 0
        },
        {
          "x": 2,
          "y": 9,
          "z": 2
        },
        {
          "x": 2,
          "y": 9,
          "z": 1
        },
        {
          "x": 2,
          "y": 9,
          "z": 0
        },
        {
          "x": 2,
          "y": 8,
          "z": 2
        },
        {
          "x": 2,
          "y": 8,
          "z": 1
        },
        {
          "x": 2,
          "y": 8,
          "z": 0
        },
        {
          "x": 2,
          "y": 7,
          "z": 2
        },
        {
          "x": 2,
          "y": 7,
          "z": 1
        },
        {
          "x": 2,
          "y": 7,
          "z": 0
        },
        {
          "x": 2,
          "y": 6,
          "z": 2
        },
        {
          "x": 2,
          "y": 6,
          "z": 1
        },
        {
          "x": 2,
          "y": 6,
          "z": 0
        },
        {
          "x": 2,
          "y": 5,
          "z": 2
        },
        {
          "x": 2,
          "y": 5,
          "z": 1
        },
   
  
      
      
      ],
      "products": [
        {
          "capacity": 5,
          "expiry": "2025-04-01",
          "id": 11111,
          "img": "https://m.media-amazon.com/images/I/81RS1H5LTUL._AC_SX569_.jpg",
          "name": "Abu Auf Fresh Food",
          "price": 100,
          "quantity": 6,
          "expired":false,
          'alarm':false,
          "x": 7,
          "y": 7,
          "z":5,
          "Positions":[  {
            "x": 0,
            "y": 6,
            "z": 2
          },
          {
            "x": 0,
            "y": 6,
            "z": 1
          },
          {
            "x": 0,
            "y": 6,
            "z": 0
          },
          {
            "x": 0,
            "y": 5,
            "z": 2
          },
          {
            "x": 0,
            "y": 5,
            "z": 1
          },
          {
            "x": 0,
            "y": 5,
            "z": 0
          }]
        },
        {
          "capacity": 2,
          "expiry": "2025-04-25",
          "id": 22222,
          "img": "https://m.media-amazon.com/images/I/81IQ5Sft6pL._AC_SY741_.jpg",
          "name": "cashews",
          "price": 100,
          "quantity": 5,
          "expired":false,
          'alarm':false,
          "x": 8,
          "y": 6,
          "z":5,
          "Positions":[  {
            "x": 0,
            "y": 8,
            "z": 1
          },
          {
            "x": 0,
            "y": 8,
            "z": 0
          },
          {
            "x": 0,
            "y": 7,
            "z": 2
          },
          {
            "x": 0,
            "y": 7,
            "z": 1
          },
          {
            "x": 0,
            "y": 7,
            "z": 0
          }]
        },
        {
          "capacity": 3,
          "expiry": "2025-06-05",
          "id": 33333,
          "img": "https://m.media-amazon.com/images/I/81XwenSnNdL._AC_SX569_.jpg",
          "name": "Studs",
          "price": 10,
          "quantity": 10,
          "expired":false,
          'alarm':false,
          "x": 1,
          "y": 8,
          "z":5,
          "Positions":[
            {
              "x": 1,
              "y": 6,
              "z": 2
            },
            {
              "x": 1,
              "y": 6,
              "z": 1
            },
            {
              "x": 1,
              "y": 6,
              "z": 0
            },
            {
              "x": 1,
              "y": 5,
              "z": 2
            },
            {
              "x": 1,
              "y": 5,
              "z": 1
            },
            {
              "x": 1,
              "y": 5,
              "z": 0
            },
            {
              "x": 0,
              "y": 9,
              "z": 2
            },
            {
              "x": 0,
              "y": 9,
              "z": 1
            },
            {
              "x": 0,
              "y": 9,
              "z": 0
            },
            {
              "x": 0,
              "y": 8,
              "z": 2
            },
          ]
        },
        {
          "capacity": 2,
          "expiry": "2025-05-03",
          "id": 44444,
          "img": "https://m.media-amazon.com/images/I/71H8ipbuxoL.__AC_SX300_SY300_QL70_ML2_.jpg",
          "name": "iphone 13",
          "price": 50000,
          "quantity": 5,
          "expired":false,
          'alarm':false,
          "x": 4,
          "y": 9,
          "z":5,
          "Positions":[
            {
              "x": 2,
              "y": 5,
              "z": 0
            },
            {
              "x": 1,
              "y": 9,
              "z": 2
            },
            {
              "x": 1,
              "y": 9,
              "z": 1
            },
            {
              "x": 1,
              "y": 9,
              "z": 0
            },
            {
              "x": 1,
              "y": 8,
              "z": 2
            },
          
          ]
        },
        {
          "capacity": 1,
          "expiry": "2025-04-01",
          "id": 55555,
          "img": "https://m.media-amazon.com/images/I/81BD92nNG5L._AC_SY741_.jpg",
          "name": "Nuts",
          "price": 100,
          "quantity": 5,
          "expired":false,
          'alarm':false,
          "x": 2,
          "y": 7,
          "z":5,
          "Positions":[
            {
              "x": 1,
              "y": 8,
              "z": 1
            },
            {
              "x": 1,
              "y": 8,
              "z": 0
            },
            {
              "x": 1,
              "y": 7,
              "z": 2
            },
            {
              "x": 1,
              "y": 7,
              "z": 1
            },
            {
              "x": 1,
              "y": 7,
              "z": 0
            },
          ]
        }
      ]
    }
  ],
  "uri": "file:///var/mobile/Containers/Data/Application/93405E2D-8586-4AA8-83B8-9759998EE7C5/Library/Caches/ExponentExperienceData/@anonymous/authenticationn-43a8986c-bfd9-4459-a9f0-0a61110db68e/ImagePicker/338A462B-E256-4113-B60D-DBE767D5986A.png",
  "Orders": {
    "Ongoing":'',
    "Pending": '',
    "Scheduled": "",
  },
});*/
      //const response = await axios.get(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${auth.userDataBaseid}`+'.json');
      //console.log(response.data['Owner']);
      
      //const response = await axios.get(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${auth.userDataBaseid}`+'/Robots'+'.json');
      //let robotArray= [];
      //for (let i=0 ; i<response.data.length;i++){
        //if(response.data[i]){
            //robotArray.push(response.data[i])
        //}
      //}
      //console.log(robotArray);
      
      //const response = await axios.get(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${auth.userDataBaseid}`+'/Space'+'.json');
      //let SectionsArray= [];
      //for (let i=0 ; i<response.data.length;i++){
        //if(response.data[i]){
            //SectionsArray.push(response.data[i])
        //}
      //}
      //console.log(SectionsArray);
      /*
      const api_Key = 'AIzaSyByarRuFKIB1PnDzJucObhG-vkkQlPlGNo'
      async function sendVerificationEmail(idToken) {
        const api_Key = 'AIzaSyByarRuFKIB1PnDzJucObhG-vkkQlPlGNo'
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${api_Key}`;
        
        const requestData = {
          requestType: 'VERIFY_EMAIL',
          email:'mn1452001@gmail.com',
          idToken:auth.token
        };
        
        try {
          const response = await axios.post(url, requestData);
          console.log('Verification email sent successfully');
          console.log(response.data); // Response from Firebase
          return response.data.kind;
        } catch (error) {
          console.error('Error sending verification email:', error.response.data);
        }

      }
      
      // Usage
      
      const code = sendVerificationEmail(auth.token);
      */
     /*async function confirm(idToken) {
        const api_Key = 'AIzaSyByarRuFKIB1PnDzJucObhG-vkkQlPlGNo'
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${api_Key}`;
        
        const requestData = {
            oobCode: idToken
        };
        
        try {
          const response = await axios.post(url, requestData);
          console.log('Verification email sent successfully');
          console.log(response.data); // Response from Firebase
          
        } catch (error) {
          console.error('Error verification email:', error.response.data);
        }

      }

      confirm(code); 
      */
     /*
      const newEmailAddress = 'mnelmaghraby145@gmail.com'; // Placeholder for the new email address
      
      const newToken = await createUser(newEmailAddress, '1452001');
      try {
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${api_Key}`, {idToken: newToken,email: newEmailAddress,returnSecureToken:true });
        await axios.patch(`https://react-native-course-778b3-default-rtdb.firebaseio.com/Warhouses/${auth.userDataBaseid}/.json`, {Email:newEmailAddress});
        const responsee = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${api_Key}`,{ idToken: auth.token});
        auth.authenticate(response.data.idToken);
        auth.getEmail(newEmailAddress);
      } catch (error) {
        console.error('Error updating email:', error);
      }
     */
    /*
       const api_Key = 'AIzaSyByarRuFKIB1PnDzJucObhG-vkkQlPlGNo'
       const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${api_Key}`,{requestType:'PASSWORD_RESET',email:auth.email});
      */ navigation.navigate('Reports');
    }
    function navigatetoOrders(){
        navigation.navigate('Orders');
    }
    function navigatetoSpace(){
        navigation.navigate('Space');
    }
    function navigatetoTime(){
        navigation.navigate('Time');
        

    }
    return (
        <View style={styles.container}>
            <Option name='newspaper-outline' value='reports' onPress={navigatetoReports}/>
            <Option name='logo-dropbox' value='orders' onPress={navigatetoOrders}/>
            <Option name='file-tray-outline' value='space' onPress={navigatetoSpace}/>
            <Option name='time-sharp' value='expiry' onPress={navigatetoTime}/>
        </View>
    )
}
export default Options;
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        
        alignItems:'center',
        justifyContent: 'center',
        marginTop:20,
        borderWidth:0
    }, a:{
        flex:1
    }
});