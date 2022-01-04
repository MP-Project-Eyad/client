import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Icon,
  Input,
  Button,
  Link,
  Image,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Profile = () => {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [flag, setFlag] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const state = useSelector((state) => {
    return state;
  });

  const id = localStorage.getItem("id");
  useEffect(() => {
    result();
    console.log(id);
  }, []);
  const result = async () => {
    await axios
      .get(`${BASE_URL}/user/${id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then((result) => {
        setUser(result.data);
        console.log(result.data);
      });
  };
  const updateUser = async () => {
    await axios.put(
      `${BASE_URL}/edituser/${id}`,
      {
        userName: username,
        avatar: avatar,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    setFlag(false);
    result();
  };
  return (
    <ChakraProvider theme={theme}>
      <SimpleGrid bg="#F3F1DE">
        <VStack >
          <Box bg="#F3F1DE" h="60%" w="60%">
            {user.length &&
              user.map((e) => (
                <Box
                  mt="100"
                  mb="250"
                  pt="20"
                  bg="white"
                  border="solid gray 2px"
                  w="100"
                >
                  <VStack>
                    <Image
                      w="60px"
                      mt="4"
                      borderRadius="full"
                      src="http://norapc.org/wp-content/uploads/2015/07/avatar-blank.png"
                    />
                    <Text>{e.userName}</Text>
                    <Text>{e.email}</Text>
                    {flag && (
                      <>
                        <Input
                          required
                          w="100"
                          textAlign="center"
                          mt="5"
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          placeholder="username"
                        />
                        <br />
                        <Input
                          required
                          mt="6"
                          w="100"
                          textAlign="center"
                          onChange={(e) => {
                            setAvatar(e.target.value);
                          }}
                          placeholder="Edit Avatar"
                        />
                      </>
                    )}
                    <br />{" "}
                    <Box
                      textAlign="center"
                      display="flex"
                      bg="#E7815C"
                      width="100%"
                      flexDirection="column"
                      justifyContent="space-evenly"
                      alignItems="center"
                    >
                      <Button
                        mt="4"
                        w="170px"
                        onClick={() => {
                          setFlag(true);
                          if (flag) {
                            updateUser();
                          }
                        }}
                      >
                        Edit Profile
                      </Button>
                      <Box bg="rgb(248,248,248)"  mt="5" mb='5' borderRadius="8px" p='5'>
                        <Text as="strong" mt="3" fontSize="1.3rem">
                          Cart
                        </Text>
                        {e.cart.items &&
                          e.cart.items.map((item) => (
                            <>
                              <Text>- {item.itemId.Name} </Text>
                            </>
                          ))}
                      </Box>
                    </Box>
                  </VStack>{" "}
                </Box>
              ))}
          </Box>
        </VStack>
      </SimpleGrid>
    </ChakraProvider>
  );
};
export default Profile;
