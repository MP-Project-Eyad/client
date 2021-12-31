import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
// import { Logoutt } from "../../reducers/Login";
import { ChakraProvider, HStack } from "@chakra-ui/react";
import {
  Box,
  Text,
  Link,
  VStack,
  Button,
  Image,
  Input,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";


const BASE_URL = process.env.REACT_APP_BASE_URL;
const Combo = () => {
  const [menu, setMenu] = useState([]);
 
  const { id } = useParams();
  // console.log(id,"resturant");
const navigate = useNavigate();

  const [local, setLocal] = useState("");

  // console.log(state.Login.token);

  useEffect(() => {
    const getToken = localStorage.getItem("token");

    getMenu(id);
  }, []);

  const getMenu = async (id) => {
    try {
      const result = await axios.get(`${BASE_URL}/item/${id}`);
      //  resturantId = result.data.map((item,i) => item.RestaurantName._id )
      setMenu(result.data.filter((item,i) => item.Category === "SANDWICH"));

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider>
      <div className="restWrapper">
        <Box>
          <VStack>
            <Input
              textAlign="center"
              width="80"
              mt="39"
              bg="#444"
              placeholder="Search..."
              fontSize="1.5rem"
              color="white"
            />
          </VStack>
          <SimpleGrid
            padding="1"
            mt="4"
            columns={1}
            spacing={10}
            border="1px solid"
          >
            <SimpleGrid columns={5} spacing={10}>
            <Box
           
              boxShadow='base' p='6' rounded='md'
                bg="#FFFAF0"
                height="80px"
                padding="1"
                pt="5"
                onClick={() => navigate(`/item/${id}`)}
                fontSize="3xl"
                textAlign="center"
                _hover={{
                  boxShadow:'outline',
                  cursor:"pointer"
                }}
              >All</Box>
              <Box
              boxShadow='base' p='6' rounded='md'
                ml="2"
                onClick={() => navigate(`/combo/${id}`)}
                bg="#FFFAF0"
                height="80px"
                padding="1"
                pt="5"
                fontSize="3xl"
                textAlign="center"
                _hover={{
                  boxShadow:'outline',
                  cursor:"pointer"
                }}
              >
                COMBO
              </Box>
              <Box
              boxShadow='base' p='6' rounded='md'
                bg="#FFFAF0"
                height="80px"
                padding="1"
                pt="5"
                fontSize="3xl"
                onClick={() => navigate(`/sandwich/${id}`)}
                textAlign="center"
                _hover={{
                  boxShadow:'outline',
                  cursor:"pointer"
                }}
              >
                SANDWICH
              </Box>
              <Box
              boxShadow='base' p='6' rounded='md'
                bg="#FFFAF0"
                height="80px"
                padding="1"
                pt="5"
                fontSize="3xl"
                onClick={() => navigate(`/drinks/${id}`)}
                textAlign="center"
                _hover={{
                  boxShadow:'outline',
                  cursor:"pointer"
                }}
              >DRINKS</Box>
              <Box
              boxShadow='base' p='6' rounded='md'
                bg="#FFFAF0"
                height="80px"
                padding="1"
                pt="5"
                fontSize="3xl"
                textAlign="center"
                _hover={{
                  boxShadow:'outline',
                  cursor:"pointer"
                }}
              ></Box>
            </SimpleGrid>{" "}
          </SimpleGrid>
          <SimpleGrid
            padding="3rem"
            columns={1}
            spacing={10}
            border="1px solid"
          >
            {menu.length &&
              menu.map((item, i) => (
                <>
                  <Box

                    padding="3"
                    boxShadow="dark-lg"
                    p="6"
                    rounded="md"
                    bg="white"
                  >
                    <Text fontSize="5xl" display="block" as="strong">
                      {item.Name}
                    </Text>
                    <Text fontSize="1rem" width="50%">
                      {item.Desc}
                    </Text>

                    <Image
                   display="inline-block" 
                      boxShadow="dark-lg"
                      borderRadius="full"
                      boxSize="200px"
                      src={item.Picture}
                      alt="Dan Abramov"
                      ml="83%"
                    />
                    <Text fontSize="4xl">
                      SAR{" "}
                      <Text fontSize="5xl" as="strong">
                        {item.price}.00
                      </Text>
                    </Text>
                  </Box>
                </>
              ))}
          </SimpleGrid>
        </Box>
        {/* <div className="logoutDiv">
      <button  id="btnLogout"onClick={logOut}>logout</button>
</div> */}
      </div>
    </ChakraProvider>
  );
};

export default Combo;