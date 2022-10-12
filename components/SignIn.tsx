import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { useAuthenticated, useSignInEmailPassword } from "@nhost/nextjs";

import styles from "../styles/components/SignIn.module.css";
import { Box, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";

const SignIn = () => {
  const isLoggedIn = useAuthenticated();

  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const handleOnSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const ok = await signInEmailPassword(email, password);

        console.log("ok", ok);

        if (ok.isError) {
          throw ok.error;
        }
      } catch (error) {
        console.error("failed to sign in", error);
      }
    },
    [email, password, signInEmailPassword]
  );

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, isSuccess, router]);

  useEffect(() => {
    if (error) {
      console.error(error);

      toast({
        title: "Failed to sign in, please try again",
        description: error.message,
        status: "error",
        duration: 10000,
      });
    }
  }, [error, toast]);

  const disableForm = isLoading || needsEmailVerification;

  return (
    <Box
      className={styles.container}
      sx={{
        input: {
          my: 1,
        },
      }}
    >
      <div className={styles.card}>
        <div className={styles["logo-wrapper"]}>
          <Image src="/logo.png" alt="logo" layout="fill" objectFit="contain" />
        </div>

        <form onSubmit={handleOnSubmit} className={styles.form}>
          <FormControl display="flex" flexDir={"column"}>
            <FormLabel mb="0">
              <strong>Email</strong>
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={disableForm}
            />
          </FormControl>

          <FormControl display="flex" flexDir={"column"}>
            <FormLabel mb="0">
              <strong>Password</strong>
            </FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={disableForm}
            />
          </FormControl>

          <button
            type="submit"
            className={styles.button}
            disabled={disableForm}
          >
            Sign in
          </button>
        </form>
      </div>

      <p className={styles.text}>
        No account yet?{" "}
        <Link href="/signup">
          <a className={styles.link}>Sign up</a>
        </Link>
      </p>
    </Box>
  );
};

export default SignIn;
