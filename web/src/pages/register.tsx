import { NextPage } from "next";
import { Formik, Form, FormikConfig, FormikHelpers, FormikErrors } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, Text } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRegisterMutation, UserInput } from "../generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";

interface IRegisterProps {}

type OnSubmit = (values: UserInput, formikHelpers: FormikHelpers<UserInput>) => void | Promise<any>;

const Register: NextPage<IRegisterProps> = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [, register] = useRegisterMutation();

  const onSubmit: OnSubmit = async (values, formikHelpers) => {
    setError('');
    
    const response = await register({ input: values });
    const errors = response.data?.register.errors;
    if (errors && errors.length) {
      formikHelpers.setErrors(
        errors.reduce<FormikErrors<UserInput>>((o, e) => ({ ...o, [e.field]: e.message}), {})
      );
      setError('There are inputs error in your form');
    } else {
      const user = response.data?.register.user;
      if (user) {
        router.push(`user/${user.username}`);
      }
      if (response.error) {
        setError('Oops.. something went wrong, may be your internet connexion.');
      }
    }
  }

  return (
    <Wrapper variant="small">
      <Text mb="5" fontSize="large">Register</Text>
      <Formik
        initialValues={{ username: "", email: "", firstName: "", lastName: "", password: "" }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text ml={2} mb={10} fontSize="lg" color="red">{error}</Text>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
              
            />
            <Box mt={4}>
              <InputField
                name="firstName"
                placeholder="First name"
                label="First name"
                required
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="lastName"
                placeholder="Last name"
                label="Last name"
                required
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
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
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
