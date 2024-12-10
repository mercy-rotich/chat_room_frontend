import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../mainContext";
import { SocketContext } from "../../socketContext";
import { Flex, Heading, IconButton, Input } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { useToast } from "@chakra-ui/react";
import { UsersContext } from "../../usersContext";

const Login = () => {
  const socket = useContext(SocketContext);
  const { name, setName, room, setRoom } = useContext(MainContext);
  const history = useHistory();
  const toast = useToast();
  const { setUsers } = useContext(UsersContext);

  //Checks to see if there's a user already present

  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(users);
    });
  });

  //Emits the login event and if successful redirects to chat and saves user data
  const handleClick = () => {
    socket.emit("login", { name, room }, (error) => {
      if (error) {
        console.log(error);
        return toast({
          position: "top",
          title: "Error",
          description: error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      history.push("/chat");
      return toast({
        position: "top",
        title: "Hey there",
        description: `Welcome to ${room}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  };

  return (
    <Flex
      className="login"
      flexDirection="column"
      mb="8"
      shadow={2}
      color="white"
      boxShadow="md"
      p="6"
      rounded="md"
      bg="white"
      width={400}
    >
      <Heading
        as="h1"
        size="4xl"
        textAlign="center"
        mb="8"
        fontFamily="DM Sans"
        fontWeight="400"
        color="gray.600"
        letterSpacing="-2px"
      >
        Login
      </Heading>
      <Flex
        className="form"
        gap="1rem"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Input
          variant="filled"
          type="text"
          placeholder="User Name"
          color={"black"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Flex>
      <Flex
        className="form"
        gap="1rem"
        flexDirection={{ base: "column", md: "row" }}
        my={3}
      >
        <Input
          variant="filled"
          type="text"
          placeholder="Room Name"
          value={room}
          color={"black"}
          onChange={(e) => setRoom(e.target.value)}
        />
      </Flex>
      <Flex
        justifyContent="center"
        sx={{ bg: "blue", rounded: 5 }}
        onClick={handleClick}
        cursor="pointer"
      >
        <IconButton
          colorScheme="transparent"
          isRound="true"
          icon={<RiArrowRightLine />}
        ></IconButton>
      </Flex>
    </Flex>
  );
};

export default Login;
