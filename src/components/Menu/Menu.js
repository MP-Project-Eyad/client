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
  Icon,
  GridItem,
} from "@chakra-ui/react";
import {  AddIcon } from '@chakra-ui/icons'
import Cart from "../Cart"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const MySwal = withReactContent(Swal);


const BASE_URL = process.env.REACT_APP_BASE_URL;
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();
  // console.log(id,"resturant");
 const navigate = useNavigate();
 const [cart, setCart] = useState([]);
  const [local, setLocal] = useState("");

  // console.log(state.Login.token);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getLocalStorage()
console.log(state);
    getMenu(id);
    // getData()
    console.log(cart);
  }, []);
  const getLocalStorage = () => {
    const item = localStorage.getItem("newUser");
    setLocal(item);
  };

  const getMenu = async (id) => {
    try {
      const result = await axios.get(`${BASE_URL}/item/${id}`);
      
      setMenu(result.data);

      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };


  // const getData = async () => {
  //   if (local) {
  //     const item = await axios.get(
  //       `http://localhost:5000/cart/${local}`
  //     );
  //     setCart(item.data);
  //     console.log(item);
  //   } 
  // };
  const onAdd = async(productId) => {
    if(local){
      console.log(productId);
      await axios.post(`${BASE_URL}/cart`,{
        itemId: productId
      },{
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });
//    
     }else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "You should register or login",
        confirmButtonColor: "black",
      });


     }
  };
  const onRemove = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x._id !== product._id));
    } else {
      setCart(
        cart.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
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
                bg="#FFFAF0"
                height="80px"
                padding="1"
                pt="5"
                onClick={() => navigate(`/combo/${id}`)}
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
                textAlign="center"
                onClick={()=>navigate(`/sandwich/${id}`)}
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
                    <Button onClick={() => onAdd(item._id)}><AddIcon/></Button>
                  </Box>
                </>
              ))}
          </SimpleGrid>
        </Box>
        <Cart/>
        {/* <div className="logoutDiv">
      <button  id="btnLogout"onClick={logOut}>logout</button>
</div> */}
      </div>
    </ChakraProvider>
  );
};

export default Menu;
