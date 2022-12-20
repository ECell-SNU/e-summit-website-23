import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
        color: "white",
      },
    }),
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
