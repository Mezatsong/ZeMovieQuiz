import { Box, Spinner, Text } from "@chakra-ui/react";

export const LoadingQuestion = () => (
  <Box my={10} mx="auto" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
    <Spinner size="lg" colorScheme="blue" />
    <Text m={4} textAlign="center" fontSize="large">Loading...</Text>
  </Box>
);
