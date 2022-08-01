import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import Image from "next/image";
import { Flex, Text, Link, Code, Heading, Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Flex direction="column" align="center" justify="center" py="3" h="100vh">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        direction="column"
        align="center"
        justify="center"
        w="full"
        flex="1"
        px="20"
      >
        <Heading as="h1" fontSize="6xl" fontWeight="bold">
          Welcome to{" "}
          <NextLink href="https://github.com/Mezatsong/ZeMovieQuiz" passHref>
            <Link color="blue.600">ZeMovieQuiz 🔥</Link>
          </NextLink>
        </Heading>

        <Text mt="3" fontSize="2xl">
          Get started by visiting{" "}
          <NextLink href="https://github.com/Mezatsong/ZeMovieQuiz" passHref>
            <Link>
              <Code
                p="3"
                fontSize="lg"
                bgColor="black.100"
                borderRadius="md"
                className="font-mono"
              >
                GitHub repository
              </Code>
            </Link>
          </NextLink>
        </Text>

        <Flex
          wrap="wrap"
          align="center"
          justify="space-around"
          maxW={["full", "4xl"]}
          mt="6"
        >
          <NextLink href="/register" passHref>
            <Link
              p="6"
              mt="6"
              w="96"
              border="1px"
              rounded="xl"
              color="blue.600"
              textAlign="left"
            >
              <Heading fontSize="2xl" fontWeight="bold">
                Register page &rarr;
              </Heading>
              <Text mt="4" size="xl">
                Test the register page with accurate error control
              </Text>
            </Link>
          </NextLink>

          <NextLink href="/login" passHref>
            <Link
              p="6"
              mt="6"
              w="96"
              border="1px"
              rounded="xl"
              color="blue.600"
              textAlign="left"
            >
              <Heading as="h3" fontSize="2xl" fontWeight="bold">
                Login page &rarr;
              </Heading>
              <Text mt="4" size="xl">
                Test the register page with accurate error control
              </Text>
            </Link>
          </NextLink>

          <NextLink href="/play" passHref>
            <Link
              p="6"
              mt="6"
              w="96"
              border="1px"
              rounded="xl"
              color="blue.600"
              textAlign="left"
            >
              <Heading as="h3" fontSize="2xl" fontWeight="bold">
                Play game &rarr;
              </Heading>
              <Text mt="4" size="xl">
                Sign in and play ZeMovieQuiz game.
              </Text>
            </Link>
          </NextLink>

          <NextLink
            href="#"
            passHref
          >
            <Link
              p="6"
              mt="6"
              w="96"
              border="1px"
              rounded="xl"
              color="blue.600"
              textAlign="left"
            >
              <Heading as="h3" fontSize="2xl" fontWeight="bold">
                User page &rarr;
              </Heading>
              <Text mt="4" size="xl">
                Hit "/user/[username]" in the navigator
              </Text>
            </Link>
          </NextLink>
        </Flex>
      </Flex>

      <Flex
        align="center"
        justify="center"
        w="full"
        h="24"
        borderTop="1px"
        className="border-t"
      >
        <NextLink
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          passHref
        >
          <Link rel="noopener noreferrer" isExternal>
            <Flex align="center" justify="center">
              <Box>Made by </Box>
              <Box ml="2">
                {" "}
                <NextLink href="mailto:meztsacar@gmail.com" passHref>
                  <Link>
                    <Code
                      p="3"
                      fontSize="lg"
                      bgColor="black.100"
                      borderRadius="md"
                      className="font-mono"
                    >
                      meztsacar@gmail.com
                    </Code>
                  </Link>
                </NextLink>
              </Box>
            </Flex>
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Home;
