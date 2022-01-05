import axios from "axios";
import React, { useState, useEffect } from "react";

import "./style.css";
import { useSelector, useDispatch } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";
import {
  Box,
  
  VStack,
 
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import Offer from "./Offer";

import Gallary from "../Gallary";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const [local, setLocal] = useState("");
  

  
  const state = useSelector((state) => {
    return state;
  });
 

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setLocal(getToken);
    getRestaurants();
  }, []);

  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
      getRestaurants();
    } else {
      setSearchShow(true);
      getRestaurantsBySearch();
    }
  };
  const getRestaurantsBySearch = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getRest`);
      setRestaurants(
        result.data.filter((item) => {
          return (
            item.Name.toLowerCase().includes(searchField.toLowerCase()) ||
            item.Category.toLowerCase().includes(searchField.toLowerCase())
          );
        })
      );

     
    } catch (error) {
      console.log(error);
    }
  };

  const getRestaurants = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getRest`);
      setRestaurants(result.data);

      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider>
      <div className="restWrapper">
        <VStack>
          <Gallary />{" "}
        </VStack>
        <VStack>
          <Input
            textAlign="center"
            width="80"
            mt="39"
            bg="#444"
            placeholder="Search..."
            fontSize="1.5rem"
            color="white"
            onChange={handleChange}
          />
        </VStack>
        <Box>
          <SimpleGrid padding="2rem" columns={3} spacing={10}>
            {restaurants.map((item, i) => (
              <>
                <Offer resturant={item} key={i} />
              </>
            ))}
          </SimpleGrid>
        </Box>
       
      </div>
    </ChakraProvider>
  );
};

export default Restaurant;
