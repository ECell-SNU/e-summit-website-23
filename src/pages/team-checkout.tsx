import { Center } from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const TeamCheckout: NextPage = () => {
  const session = useSession();
  console.log(session.status);
  if (session.status === "unauthenticated") {
    return (
      <Center flexDir="column" gap="5" h="100vh">
        <div>Sign in with the email you received our confirmation from</div>
        <div
          className="cursor-pointer rounded-full bg-blue-500 px-7 py-1 text-lg transition-transform duration-300 ease-in-out hover:-translate-y-px"
          onClick={() => signIn("google", { callbackUrl: "/team-checkout" })}
        >
          Sign in
        </div>
      </Center>
    );
  }
  return <></>;
};

export default TeamCheckout;
