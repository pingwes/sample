import { NhostClient, NhostNextProvider } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "../UserProvider";

import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import theme from "../theme";

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "",
  region: process.env.NEXT_PUBLIC_NHOST_REGION || "",
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
        <NhostApolloProvider nhost={nhost}>
          <UserProvider>
            <Component {...pageProps} />
            <Toaster />
          </UserProvider>
        </NhostApolloProvider>
      </NhostNextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
