import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../utils/trpc";

type MemInfo = {
  name: string;
  email: string;
};
const TeamRegister = () => {
  const { data: isEvent } = trpc.teamRegisterRouter.isEvent.useQuery();
  const [size, setSize] = useState(1);
  const [membersInfo, setMembersInfo] = useState<MemInfo[]>([
    { name: "", email: "" },
  ]);

  const changeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
    const newMembersInfo = Array(Number(e.target.value)).fill({
      name: "",
      email: "",
    });
  };
  const updateName = (name: string, index: number) => {
    const newMembersInfo = [...membersInfo];

    if (newMembersInfo[index] !== undefined) newMembersInfo[index].name = name;
    setMembersInfo(newMembersInfo);
  };

  const updateEmail = (email: string, index: number) => {
    const newMembersInfo = [...membersInfo];
    if (newMembersInfo[index] !== undefined)
      newMembersInfo[index].email = email;
    setMembersInfo(newMembersInfo);
  };

  console.log(membersInfo);
  const maxSize =
    isEvent === "STARTUPVERSE" ? Array(10).fill(0) : Array(4).fill(0);

  const curSize = Array(size).fill(0);
  if (isEvent !== Role.USER && isEvent !== undefined)
    return (
      <Center flexDir="column" gap="2rem">
        <Heading textAlign="center" mt="5rem">
          Register team for {isEvent.toLowerCase()}
        </Heading>
        <Flex flexDir="column" align="start" mx="auto" maxW="80%" gap="1rem">
          <Flex w="100%" align="center" gap="1rem">
            <Text>Team Size</Text>
            <Select
              maxW="100px"
              onChange={(e) => setSize(Number(e.target.value))}
            >
              {maxSize.map((_, index) => (
                <option
                  style={{ background: "black" }}
                  key={index}
                  value={index + 1}
                >
                  {index + 1}
                </option>
              ))}
            </Select>
          </Flex>
          <FormControl maxW="300px" isRequired>
            <FormLabel>Team Name</FormLabel>
            <Input type="text" />
          </FormControl>
          {curSize.map((_, index) => (
            <>
              <FormControl key={index} maxW="300px" isRequired>
                <FormLabel>Member {index + 1} name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl key={index} maxW="300px" isRequired>
                <FormLabel>Member {index + 1} Email ID</FormLabel>
                <Input type="text" />
              </FormControl>
            </>
          ))}
        </Flex>
      </Center>
    );
  else return <h1 style={{ margin: "10rem", color: "white" }}></h1>;
};
export default TeamRegister;
