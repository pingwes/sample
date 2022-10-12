import Link from "next/link";
import { Fragment } from "react";

import {
  Box,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSignOut } from "@nhost/nextjs";

import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  HomeIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/outline";

import { useUserContext } from "../UserProvider";

import Avatar from "./Avatar";
import ColorSwitch from "./ui/ColorSwitcher";

import styles from "../styles/components/Layout.module.css";

const Layout = ({ children = null }) => {
  const color = useColorModeValue("black", "white");

  const { user } = useUserContext();

  const { signOut } = useSignOut();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: HomeIcon,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: UserIcon,
      onClick: null,
    },
  ].concat(
    (user
      ? [{ label: "Sign Out", onClick: signOut, icon: LogoutIcon }]
      : [
          {
            label: "Sign In",
            href: "/login",
            icon: UserIcon,
          },
        ]) as any
  );

  return (
    <div>
      <header className={styles.header}>
        <div className={styles["header-container"]}>
          <Flex
            flexDir="row"
            flex={1}
            alignItems={"center"}
            gridGap={["12px", "12px", "24px"]}
          >
            <Box>
              <Link href="/">
                <a>
                  <Image
                    src="/logo.png"
                    alt="logo"
                    maxH={["30px", "30px", "50px"]}
                  />
                </a>
              </Link>
            </Box>
            <Box display={user !== null ? "block" : "none"}>
              <Link href={"/"} passHref>
                <Heading size="md" fontSize={["1em", "1em", "1.5em"]}>
                  <ChakraLink href="">Home</ChakraLink>
                </Heading>
              </Link>
            </Box>
          </Flex>

          <Menu as="div" className={styles.menu}>
            <Menu.Button className={styles["menu-button"]}>
              {!user ? (
                <Link href={"/login"} passHref>
                  <ChakraLink href="" fontSize={["1em", "1em", "1.5em"]}>
                    Login
                  </ChakraLink>
                </Link>
              ) : (
                <>
                  <Text>42 Credits 💳</Text>
                  <Avatar src={user?.avatarUrl} alt={user?.displayName} />
                  <ChevronDownIcon />
                </>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter={styles["menu-transition-enter"]}
              enterFrom={styles["menu-transition-enter-from"]}
              enterTo={styles["menu-transition-enter-to"]}
              leave={styles["menu-transition-leave"]}
              leaveFrom={styles["menu-transition-leave-from"]}
              leaveTo={styles["menu-transition-leave-to"]}
            >
              <Menu.Items
                className={styles["menu-items-container"]}
                style={{
                  borderColor: color,
                  backgroundColor: color === "white" ? "black" : "white",
                }}
              >
                <div className={styles["menu-header"]}>
                  <Avatar src={user?.avatarUrl} alt={user?.displayName} />
                  <div className={styles["user-details"]}>
                    <span>{user?.displayName}</span>
                    <span className={styles["user-email"]}>{user?.email}</span>
                  </div>
                </div>

                <div className={styles["menu-items"]}>
                  {menuItems.map(({ label, href, onClick, icon: Icon }) => (
                    <div key={label} className={styles["menu-item"]}>
                      <Menu.Item>
                        {href ? (
                          <Link href={href}>
                            <a>
                              <Icon />
                              <span>{label}</span>
                            </a>
                          </Link>
                        ) : (
                          <button onClick={onClick}>
                            <Icon />
                            <span>{label}</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
                </div>
              </Menu.Items>
            </Transition>

            <Box display={["none", "none,", "none", "block"]} zIndex={-1}>
              <ColorSwitch />
            </Box>
          </Menu>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles["main-container"]}>{children}</div>
      </main>

      <Flex flexDir={"column"}>
        <Box display={["unset", "unset", "unset", "none"]} m="auto">
          <ColorSwitch />
        </Box>
      </Flex>
    </div>
  );
};

export default Layout;
