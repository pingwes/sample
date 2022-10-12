import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { Box, Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import { useSignUpEmailPassword } from "@nhost/nextjs";

import Input from "./Input";

import styles from "../styles/components/SignUp.module.css";

const SignUp = () => {
  const router = useRouter();
  const toast = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignUpEmailPassword({
    allowedRoles: ["user"],
    defaultRole: "user",
  });

  const handleOnSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      console.log("signing up");
      await signUpEmailPassword(email, password, {
        displayName: `${firstName} ${lastName}`.trim(),
        metadata: {
          firstName,
          lastName,
        },
      });

      setEmailSent(true);

      toast({
        title: "Check your email 📧",
        description: "We've sent you a verification email.",
        status: "success",
        isClosable: false,
        duration: 120000,
      });
    },
    [email, firstName, lastName, password, signUpEmailPassword, toast]
  );

  useEffect(() => {
    if (isSuccess) {
      return null;
    }
  }, [isSuccess, router]);

  const disableForm = isLoading || needsEmailVerification;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles["logo-wrapper"]}>
          <Image src="/logo.png" alt="logo" layout="fill" objectFit="contain" />
        </div>

        {emailSent ? (
          <Flex flexDir={"column"} p={4} alignItems="center">
            <Heading size="md">Please click the link in your email!</Heading>
            <Spinner />
          </Flex>
        ) : (
          <form onSubmit={handleOnSubmit} className={styles.form}>
            <div className={styles["input-group"]}>
              <Input
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={disableForm}
              />
              <Input
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={disableForm}
              />
            </div>
            <Input
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={disableForm}
            />
            <Input
              type="password"
              label="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={disableForm}
            />

            <button
              type="submit"
              className={styles.button}
              disabled={disableForm}
            >
              Create account
            </button>
          </form>
        )}
      </div>

      <p className={styles.text}>
        Already have an account?{" "}
        <Link href="/sign-in">
          <a className={styles.link}>Sign in</a>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
