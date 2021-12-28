import React,{useState,useEffect} from "react";
import axios from "axios";
import {
  Box,
  Text,
  Link,
  VStack,
  Button,
  Image,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;


export default function Offer(resturant) {
    const [offers, setOffers] = useState([]);
  const [visible, setVisible] = useState(false);
  console.log(resturant,"resturant");

    const getOffers = async (id) => {
        try {
          const result = await axios.get(`${BASE_URL}/getOffer/${id}`);
          setOffers(result.data);
          setVisible(!visible);
          console.log(visible);
          console.log(result.data);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <VStack className="mainDiv">
    <Box
      border="1px solid #222"
      textAlign="center"
      padding="20px"
      borderRadius="7"
    >
      <Text
        fontSize="2rem"
        fontFamily="Hardware"
        key={`desc-${resturant.resturant._id}`}
      >
        {resturant.resturant.Name}
      </Text>

      <Text key={`img-${resturant.resturant._id}`}>
        <Image
          borderRadius="full"
          boxSize="300px"
          src={resturant.resturant.Picture}
          alt="Dan Abramov"
        />
      </Text>
      <Button
        mt="6"
        ml="170"
        bg="#222"
        color="white"
        _hover={{
          background: "white",
          color: "black",
          key: `${resturant.resturant._id}`,
        }}
        onClick={(i) => {
          getOffers(resturant.resturant._id);
        }}
      >
        {visible ? "Hide offers" : "Show offers"}
      </Button>
    </Box>
    {visible && offers.map((element, i) => (
        <Box
          border="2px solid black"
          w="97%"
          textAlign="center"
          key={`Box-${i}`}
        >
          <Text key={`T1-${i}`}>{element.CompanyOffer.Name}</Text>
          <Text key={`T2-${i}`}>{element.DeliveryPrice} SR</Text>
        </Box>
      ))}
  </VStack>)
}
