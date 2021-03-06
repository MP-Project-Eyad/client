import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  Box,
  Text,
  VStack,
  ChakraProvider,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const RestOffer = ({ resturant }) => {
  const [offers, setOffers] = useState([]);
  const [offer, setOffer] = useState([]);
  // const [offerId, setOfferId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getOffers();
    getOfferId()
    // eslint-disable-next-line 
  }, []);
  const goToOffers = () => {
    navigate(`/item/${resturant.resturant._id}`);
  };
  const getOffers = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/getOffer/${resturant.resturant._id}`
      );
      setOffers(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const getOfferId = async (oId) => {
    try {
      const result = await axios.get(
        `${BASE_URL}/getOfferid/${oId}`
      );
      setOffer(result.data);
      localStorage.removeItem('offerId')
      localStorage.setItem("offerId", JSON.stringify(result.data));
      console.log(offer);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      {offers.map((element, i) => (
        <Text
          onClick={goToOffers}
          borderRadius="5"
          w="100%"
          cursor="pointer"
          textAlign="center"
          textStyle="none"
          textDecoration="none"
          key={`Box-${i}`}
        >
          <SimpleGrid padding="1rem" columns={1} spacing={10}>
            <Box
           onClick={()=>{
            getOfferId(element._id)
           }}
              key={`Box-${i}`}
              boxShadow="dark-lg"
              _hover={{ boxShadow: "outline" ,
              textStyle:"none",
              textDecoration:"none"}}
            >
              <Text key={`T1-${i}`} display="block">
                {element.CompanyOffer.Name}
              </Text>
              <Text key={`T2-${i}`} display="block">
                {element.DeliveryPrice} SR
              </Text>
            </Box>
          </SimpleGrid>
        </Text>
      ))}
    </>
  );
};

export default function Offer(resturant) {
 
  return (
    <ChakraProvider>
    <SimpleGrid padding="3rem" columns={1} spacing={10}>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <VStack>
              <h1 key={`desc-${resturant.resturant._id}`}>
                {resturant.resturant.Name}
              </h1>
              <Image
                borderRadius="full"
                boxSize="80%"
                src={resturant.resturant.Picture}
                alt="Restaurant logo"
              />
            </VStack>
          </div>
          <div className="flip-card-back">
            <RestOffer resturant={resturant} />
          </div>
        </div>
      </div>
    </SimpleGrid>
    </ChakraProvider>
  );
}
