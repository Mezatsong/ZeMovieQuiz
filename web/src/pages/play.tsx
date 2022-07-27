import { NextPage } from "next";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useEffect, useState } from "react";
import { TimerLabel } from "../components/play/TimerLabel";
import { QuizView } from "../components/play/QuizView";

const GAME_PART_TIME_IN_SECONDS = 60;
const HISCORE_LOCAL_KEY = 'Play@hiscore';

type GameState = 'pending' | 'playing' | 'over';

interface IPlayProps {}

const Play: NextPage<IPlayProps> = () => {
  
  const [hiScore, setHiScore] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');
  const [timeOver, setTimeOver] = useState(false);
  const [gameState, setGameState] = useState<GameState>('pending');

  useEffect(() => {
    updateHiScore();
  }, []);

  const startGame = () => {
    setError('');
    updateHiScore();
    setTimeOver(false);
    setGameState('playing');
  }
  
  const onGameOver = (pScore: number) => {
    setScore(pScore);
    updateHiScore();
    setGameState('over');
  }

  const updateHiScore = () => {
    const savedHiScore = parseInt(localStorage.getItem(HISCORE_LOCAL_KEY) ?? '0');
    if (score > savedHiScore) {
      localStorage.setItem(HISCORE_LOCAL_KEY, `${score}`);
      setHiScore(score);
    } else {
      setHiScore(savedHiScore);
    }
  }
  
  if (error) {
    return (
      <Wrapper center variant="small">
        <Text my={10} fontSize="3xl" color="red" textAlign="center">Sorry, an error occur ☹️</Text>
        <Text mb={10} fontSize="large" textAlign="center">Error message: {error}</Text>
        <Box mx="auto" display="flex" alignItems="center" justifyContent="center" width="60%">
          <Button colorScheme="blue" width="lg" onClick={() => location.reload()}>Try again</Button>
        </Box>
      </Wrapper>
    );
  }

  if (gameState === 'pending') {
    return (
      <Wrapper center variant="small">
        <Box >
          <Text my={10} fontSize="5xl" textAlign="center">ZeMovieQuiz 🔥</Text>
          {hiScore ? <Text my={4} textAlign="center" fontSize="large">Highscore: {hiScore}</Text> : <></>}
          <Box mx="auto" display="flex" alignItems="center" justifyContent="center" width="60%">
            <Button colorScheme="blue" width="lg" onClick={startGame}>Play</Button>
          </Box>
        </Box>
      </Wrapper>
    );
  }

  if (gameState === 'over') {
    return (
      <Wrapper center variant="small">
        <Text my={4} fontSize="4xl" textAlign="center">Your Score: {score}</Text>
        <Text mb={10} fontSize="large" textAlign="center">Highscore: {hiScore}</Text>
        <Box mx="auto" display="flex" alignItems="center" justifyContent="center" width="60%">
          <Button colorScheme="blue" width="lg" onClick={startGame}>Replay</Button>
        </Box>
      </Wrapper>
    );
  }

  return (
    <Wrapper center variant="regular">
      <TimerLabel 
        onTimeOver={() => setTimeOver(true)} 
        timeInSeconds={GAME_PART_TIME_IN_SECONDS} 
      />
      
      <QuizView 
        onError={msg => setError(msg)}
        onGameOver={onGameOver}
        timeOver={timeOver}
      />

      <Box mt={4} display="flex" alignItems="center" justifyContent="space-between">
        <Text fontSize="sm">Highscore: {hiScore}</Text>
        <Text fontSize="sm">Previous score: {score}</Text>
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Play);
