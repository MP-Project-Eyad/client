import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
// import { Logoutt } from "../../reducers/Login";
import { ChakraProvider } from "@chakra-ui/react";
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
const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState("");

  const [local, setLocal] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  // console.log(state.Login.token);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setLocal(getToken);
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getRest`);
      setRestaurants(result.data);

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   const logOut =()=>{

  //      dispatch(Logoutt({role:"",token:""}));
  //    localStorage.clear()
  //    navigate('/login')

  //   }

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
          <SimpleGrid padding="3rem" columns={3} spacing={10}>
            {restaurants.map((item, i) => (
              <>
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
                      key={`desc-${item._id}`}
                    >
                      {item.Name}
                    </Text>

                    <Text key={`img-${item._id}`}>
                      <Image
                        borderRadius="full"
                        boxSize="300px"
                        src={item.Picture}
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
                      }}
                    >
                      Show Offers
                    </Button>
                  </Box>
                </VStack>
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

export default Restaurant;
