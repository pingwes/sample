import { Flex, Heading, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";
import { useUserContext } from "../UserProvider";

const Home = () => {
  const { user } = useUserContext();

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Flex flexDir={"column"} gridGap={["16px", "16px", "16px", "48px"]}>
        <VStack gridGap={0}>
          <Heading size="lg"></Heading>
        </VStack>
      </Flex>
    </Layout>
  );
};

export default Home;
