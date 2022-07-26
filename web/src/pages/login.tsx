import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, Text } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";

interface ILoginProps {}

const Login: NextPage<ILoginProps> = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Text mb="5" fontSize="large">Login</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          setError('');
          const response = await login({ input: values });
          if (response.error) {
            setError('Oops.. something went wrong, may be your internet connexion.');
          } else {
            const user = response.data?.login;
            if (user) {
              router.push(`user/${user.username}`);
            } else {
              setError('Incorrect username or password !');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text ml={2} fontSize="sm" color="red">{error}</Text>
            <Box mt={4}>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
                required
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
                required
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
