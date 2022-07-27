import { FC, useEffect, useState } from "react";
import { Text, Box } from "@chakra-ui/react";

interface ITimeLabelProps {
  timeInSeconds: number
  onTimeOver: () => void
}

export const TimerLabel: FC<ITimeLabelProps> = (props) => {

  const [remainingSeconds, setRemainingSeconds] = useState(props.timeInSeconds);

  useEffect(() => {
    passTime(remainingSeconds+1);
  }, []);

  const passTime = (sec: number) => {
    if (sec > 0) {
      setRemainingSeconds(sec - 1);
      setTimeout(() => passTime(sec-1), 1000);
    } else {
      props.onTimeOver();
    }
  }

  const lastSeconds = props.timeInSeconds / 10;
  const color = remainingSeconds > lastSeconds ? "black" : "red";

  return (
    <Box m={4} display="flex" alignItems="center" justifyContent="center">
      {remainingSeconds ? (
        <>
          <Text fontSize="lg" fontWeight="bold" color={color}>{remainingSeconds}</Text>
          <Text fontSize="sm" fontWeight="bold" color={color} ml="3">seconds left</Text>
        </>
      ) : <Text fontSize="sm" fontWeight="bold" ml="3">Time over</Text>}
    </Box>
  );
}
