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
const goToOffers =()=>{
navigate(`/item/${resturant.resturant._id}`)
}
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
          </Box></SimpleGrid>
        </Link>
      
      ))}
    </>
  );
};

export default function Offer(resturant) {
  return (
    // <VStack className="mainDiv">
    //   <Box
    //   boxShadow="dark-lg"
    //   class="flip-card"
    //     textAlign="center"
    //     padding="20px"
    //     borderRadius="7"
    //     h="300px"
    //   >
    //     <Box className="flip-card-inner"  >
    //     <Box className="flip-card-front">
    //     <Text
    //       fontSize="2rem"
    //       fontFamily="Hardware"
    //       key={`desc-${resturant.resturant._id}`}
    //     >
    //       {resturant.resturant.Name}
    //     </Text>

    //     <Text key={`img-${resturant.resturant._id}`}>
    //       <Image

    //         borderRadius="full"
    //         boxSize="150px"
    //         src={resturant.resturant.Picture}
    //         alt="Dan Abramov"
    //       />
    //     </Text>
    //     <Button
    //       mt="6"
    //       ml="170"
    //       bg="#222"
    //       color="white"
    //       _hover={{
    //         background: "white",
    //         color: "black",
    //         key: `${resturant.resturant._id}`,
    //       }}
    //       onClick={(i) => {
    //         getOffers(resturant.resturant._id);
    //       }}
    //     >
    //       {visible ? "Hide offers" : "Show offers"}
    //     </Button>
    //     </Box>

    //   {visible &&
    //     offers.map((element, i) => (
    //       <Link
    //       className='info'
    //       textDecor='none'
    //         href={`/item/${resturant.resturant._id}`}
    //         border="2px solid black"
    //         borderRadius="5"
    //         w="70%"
    //         textAlign="center"
    //         key={`Box-${i}`}
    //       >
    //         <Box key={`Box-${i}`}
    //         boxShadow="dark-lg"
    //         _hover={{boxShadow:"inner"}}>
    //           <Text key={`T1-${i}`} display="block">{element.CompanyOffer.Name}</Text>
    //           <Text key={`T2-${i}`} display="block">{element.DeliveryPrice} SR</Text>
    //         </Box>
    //       </Link>

    //     ))}
    //     </Box>
    //       </Box>
    // </VStack>
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
