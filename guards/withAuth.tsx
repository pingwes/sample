import { useAuthenticationStatus } from "@nhost/nextjs";
import { useRouter } from "next/router";

import { Box, Flex, Spinner } from "@chakra-ui/react";

export default function withAuth(Component) {
  return function AuthProtected(props) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();

    if (isLoading) {
      return (
        <Flex
          flexDir={"column"}
          minH="100vh"
          minW={"100vh"}
          alignItems="center"
        >
          <Flex
            flex={1}
            h="100%"
            alignSelf={"center"}
            flexDir="row"
            alignItems="center"
          >
            <Spinner />
          </Flex>
        </Flex>
      );
    }

    if (!isAuthenticated) {
      router.push("/login");
      return null;
    }

    return <Component {...props} />;
  };
}
