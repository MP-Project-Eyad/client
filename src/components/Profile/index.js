import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Input,
  Button,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Profile = () => {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");

  const [avatar, setAvatar] = useState("");
  const [flag, setFlag] = useState(false);

  const state = useSelector((state) => {
    return state;
  });

  const id = localStorage.getItem("id");
  useEffect(() => {
    result();
    // eslint-disable-next-line
  }, []);
  const result = async () => {
    await axios
      .get(`${BASE_URL}/user/${id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then((result) => {
        setUser(result.data);
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
        <VStack>
          <Box bg="#F3F1DE" h="60%" w="60%">
            {user.length &&
              user.map((e) => (
                <Box
                  mt="100"
                  mb="250"
                  pt="9"
                  bg="white"
                  border="solid gray 2px"
                  w="100"
                >
                  <VStack>
                    <Image
                      w="90px"
                      mt="4"
                      borderRadius="full"
                      src={e.avatar}
                    />
                    <Text>{e.userName}</Text>
                    <Text>{e.email}</Text>
                    {flag && (
                      <>
                        <Input
                          required
                          defaultValue={e.userName}
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
                          defaultValue={e.avatar}
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
                      <Box
                        bg="rgb(248,248,248)"
                        mt="5"
                        mb="5"
                        borderRadius="8px"
                        p="5"
                      >
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
