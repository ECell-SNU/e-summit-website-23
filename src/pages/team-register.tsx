import {
  Box,
  Button,
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
  const [size, setSize] = useState(2);
  const [membersInfo, setMembersInfo] = useState<MemInfo[]>([
    { name: "", email: "" },
  ]);

  console.log(membersInfo);

  const [teamName, setTeamName] = useState("");
  const updateName = (name: string, index: number) => {
    const newMembersInfo = [...membersInfo];

    newMembersInfo[index]!.name = name;
    setMembersInfo(newMembersInfo);
  };

  const updateEmail = (email: string, index: number) => {
    const newMembersInfo = [...membersInfo];
    if (newMembersInfo[index] === undefined)
      newMembersInfo[index]!.email = email;
    setMembersInfo(newMembersInfo);
  };

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
              {maxSize.map(
                (_, index) =>
                  index > 0 && (
                    <option
                      style={{ background: "black" }}
                      key={index}
                      value={index + 1}
                    >
                      {index + 1}
                    </option>
                  )
              )}
            </Select>
          </Flex>
          <FormControl maxW="300px" isRequired>
            <FormLabel>Team Name</FormLabel>
            <Input
              onChange={(e) => setTeamName(e.target.value)}
              value={teamName}
              type="text"
            />
          </FormControl>
          {curSize.map((_, index) => (
            <>
              <Text>
                Member {index + 1} {index === 0 ? "(Leader)" : ""}
              </Text>
              <Flex gap="1rem">
                <Input
                  placeholder="name"
                  onChange={(e) => updateName(e.target.value, index)}
                  value={membersInfo[index]?.name}
                  type="text"
                />
                <Input
                  placeholder="email"
                  value={membersInfo[index]?.email}
                  onChange={(e) => updateEmail(e.target.value, index)}
                  type="text"
                />
              </Flex>
            </>
          ))}
        </Flex>
        <Button
          color="black"
          isDisabled={membersInfo.some(
            (member) => member.name === "" || member.email === ""
          )}
        >
          Register Team
        </Button>
      </Center>
    );
  else return <Heading mt="5rem">Not registered for event</Heading>;
};
export default TeamRegister;
