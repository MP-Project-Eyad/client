import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  Box,
  Text,
  Link,
  VStack,
  Button,
  Image,
  Input,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const RestOffer = ({ resturant }) => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOffers();
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
  return (
    <>
      {offers.map((element, i) => (
        <Link
          onClick={goToOffers}
          borderRadius="5"
          w="20%"
          textAlign="center"
          key={`Box-${i}`}
        >
          <SimpleGrid padding="1rem" columns={1} spacing={10}>
            <Box
              key={`Box-${i}`}
              boxShadow="dark-lg"
              _hover={{ boxShadow: "outline" }}
            >
              <Text key={`T1-${i}`} display="block">
                {element.CompanyOffer.Name}
              </Text>
              <Text key={`T2-${i}`} display="block">
                {element.DeliveryPrice} SR
              </Text>
            </Box>
          </SimpleGrid>
        </Link>
      ))}
    </>
  );
};

export default function Offer(resturant) {
  return (
    <SimpleGrid padding="3rem" columns={3} spacing={10}>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
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
  );
}
