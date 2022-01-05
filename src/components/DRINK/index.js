import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "./style.css";
import { useSelector } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";
import {
  Box,
  Text,
  VStack,
  Button,
  Image,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import Cart from "../Cart";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Drinks = () => {
  const [menu, setMenu] = useState([]);
  const [number1, setNumber1] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  const [local, setLocal] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  const getLocalStorage = () => {
    const item = localStorage.getItem("newUser");
    setLocal(item);
  };
  useEffect(() => {
    // const getToken = localStorage.getItem("token");
    getLocalStorage();
    getMenu(id);
     // eslint-disable-next-line
  }, []);

  const getMenu = async (id) => {
    try {
      const result = await axios.get(`${BASE_URL}/item/${id}`);

      setMenu(result.data.filter((item, i) => item.Category === "DRINKS"));
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = async (productId) => {
    if (local) {
      await axios.post(
        `${BASE_URL}/cart`,
        {
          itemId: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      setNumber1(number1 + 1);
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "You should register or login",
        confirmButtonColor: "black",
      });
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
            boxShadow="lg"
          >
            <SimpleGrid columns={[1,2,3,4]} spacing={10}>
              <Box
                boxShadow="base"
               
                rounded="md"
                bg="#FFF"
                height="50px"
                padding="1"
                ml="1"
                onClick={() => navigate(`/item/${id}`)}
                fontSize={["1xl","2xl","3xl"]}
                textAlign="center"
                _hover={{
                  boxShadow: "outline",
                  cursor: "pointer",
                }}
              >
                All
              </Box>
              <Box
                boxShadow="base"
              
                rounded="md"
               
                onClick={() => navigate(`/combo/${id}`)}
                bg="#FFF"
                height="50px"
                padding="1"
                ml="1"
                fontSize={["1xl","2xl","3xl"]}
                textAlign="center"
                _hover={{
                  boxShadow: "outline",
                  cursor: "pointer",
                }}
              >
                COMBO
              </Box>
              <Box
                boxShadow="base"
                
                rounded="md"
                bg="#FFF"
                height="50px"
                padding="1"
                ml="1"
                fontSize={["1xl","2xl","3xl"]}
                onClick={() => navigate(`/sandwich/${id}`)}
                textAlign="center"
                _hover={{
                  boxShadow: "outline",
                  cursor: "pointer",
                }}
              >
                SANDWICH
              </Box>
              <Box
                boxShadow="base"
             
                rounded="md"
                bg="#FFF"
                height="50px"
                padding="1"
                ml="1"
                onClick={() => navigate(`/drinks/${id}`)}
                fontSize={["1xl","2xl","3xl"]}
                textAlign="center"
                _hover={{
                  boxShadow: "outline",
                  cursor: "pointer",
                }}
              >
                DRINKS
              </Box>
            </SimpleGrid>{" "}
          </SimpleGrid>
          <SimpleGrid padding="3rem" columns={[1,2]} spacing={10}>
            <Box>
              <SimpleGrid padding="1rem" columns={1} spacing={10}>
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
                          ml="50%"
                        />
                        <Text fontSize="4xl">
                          SAR{" "}
                          <Text fontSize="5xl" as="strong">
                            {item.price}.00
                          </Text>
                        </Text>
                        <Button onClick={() => onAdd(item._id)}>
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-cart4"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                          </svg>
                        </Button>
                      </Box>
                    </>
                  ))}
              </SimpleGrid>
            </Box>
            <VStack>
              <Box
                textAlign="center"
                position="sticky"
                top="2%"
                padding="3"
                w="400px"
                mt="7%"
                boxShadow="dark-lg"
                p="6"
                rounded="md"
                bg="white"
              >
                <Cart number1={number1} />
              </Box>
            </VStack>
          </SimpleGrid>
        </Box>
      </div>
    </ChakraProvider>
  );
};

export default Drinks;
