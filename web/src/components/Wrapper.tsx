import { FC } from "react";
import { Box } from "@chakra-ui/react";

interface IWrapperProps {
  variant?: "small" | "regular" | "";
  center?: boolean
}

export const Wrapper: FC<IWrapperProps> = ({
  children,
  center,
  variant = "regular",
}) => {
  let ParentBox = Box;
  if (center) {
    const props = {
      display:"flex",
      alignItems:"center", 
      justifyContent:"center", 
      minHeight:"70vh"
    }
    ParentBox = ({children: chld}) => <Box {...props}>{chld}</Box>;
  }

  return (
    <ParentBox>
      <Box
        mt={8}
        mx="auto"
        maxW={variant === "regular" ? "800px" : "400px"}
        w="full"
      >
        {children}
      </Box>
    </ParentBox>
  );
};
