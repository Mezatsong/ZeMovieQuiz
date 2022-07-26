import { FC, useEffect, useState } from "react";
import { Text, Box } from "@chakra-ui/react";

interface ITimeLabelProps {
  timeInSeconds: number
  onTimeOver: () => void
}

export const TimerLabel: FC<ITimeLabelProps> = (props) => {

  const [remainingSeconds, setRemainingSeconds] = useState(props.timeInSeconds);

  useEffect(() => {
    passTime();
  }, []);

  const passTime = () => {
    if (remainingSeconds > 0) {
      setRemainingSeconds(remainingSeconds - 1);
      setTimeout(passTime, 1000);
    } else {
      props.onTimeOver();
    }
  }

  const lastSeconds = props.timeInSeconds / 100;
  const color = remainingSeconds > lastSeconds ? "black" : "red";

  return (
    <Box m={4} display="flex" alignItems="center" justifyContent="center">
      <Text fontSize="lg" fontWeight="bold" color={color}>{remainingSeconds}</Text>
      <Text fontSize="sm" fontWeight="bold" color={color} ml="3">seconds left</Text>
    </Box>
  );
}
