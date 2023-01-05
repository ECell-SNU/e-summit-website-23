import { Center } from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function error() {
  return (
    <>
      <Navbar />
      <Center h="90vh" flexDir="column">
        <h1>Coming soon...</h1>
        <Link style={{ color: "blue" }} href="/">
          Go back
        </Link>
      </Center>
    </>
  );
}
