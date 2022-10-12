import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";

import Layout from "../components/Layout";
import SignUp from "../components/SignUp";

import { useUserContext } from "../UserProvider";

import styles from "../styles/pages/Home.module.css";

const SignupPage = () => {
  const { user } = useUserContext();

  return (
    <Layout>
      <Head>
        <title>Sign Up</title>
      </Head>

      <Flex flexDir={"column"} gridGap="12px">
        <Heading className={styles.title} textAlign="center">
          Sign Up
        </Heading>

        <Text textAlign={"center"}>
          Completely free, no credit card required. <br /> You get 50 free
          credits every single day.
        </Text>

        <Box marginX={"auto"}>
          <SignUp />
        </Box>
      </Flex>
    </Layout>
  );
};

export default SignupPage;
