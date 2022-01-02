// import React,{useState,useEffect} from "react";
// import axios from "axios";
// import {
//   Box,
//   Text,
//   Link,
//   VStack,
//   Button,
//   Image,
//   Input,
//   SimpleGrid,
// } from "@chakra-ui/react";

// const BASE_URL = process.env.REACT_APP_BASE_URL;


// export default function Offer(resturant) {
//     const [menu, setMenu] = useState([]);
  
// //   console.log(resturant.resturant,"resturant");

//   useEffect(() => {
//     getMenu(resturant.resturant.RestaurantName._id);
//   }, [])

//     const getMenu = async (id) => {
//         try {
//           const result = await axios.get(`${BASE_URL}/item/${id}`);
//           setMenu(result.data.Menu);
          
//         //   console.log(result.data.Menu);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//   return (
//     <VStack className="mainDiv">
//     <h1>ddd</h1>
   
//   </VStack>)
// }