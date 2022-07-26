import { NextPage } from "next";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useGetQuestionQuery, useAnswerMutation } from "../generated/graphql";
import { useEffect, useState } from "react";
import { TimerLabel } from "../components/play/TimerLabel";
import { LoadingQuestion } from "../components/play/LoadingQuestion";

const GAME_PART_TIME_IN_SECONDS = 60;
const HISCORE_LOCAL_KEY = 'Play@hiscore';

interface IPlayProps {}

type GameState = 'pending' | 'playing' | 'over';

type LoadingType = 'yes' | 'no' | undefined;

const Play: NextPage<IPlayProps> = () => {
  
  const [hiScore, setHiScore] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('pending');
  const [loadingType, setLoadingType] = useState<LoadingType>();

  const [{ 
    fetching: fetchingQuestion, 
    error: questionError,
    data: questionData
  }, fetchQuestion ] = useGetQuestionQuery({
    requestPolicy: 'network-only',
  });

  const [{ fetching: answering, error: answerError }, answer] = useAnswerMutation();

  useEffect(() => {
    updateHiScore();
  }, []);

  const startGame = () => {
    fetchQuestion();
    setScore(0);
    setGameState('playing');
  }

  const onAnswer = async (isInCast: boolean) => {
    if (!questionData) return;
    setLoadingType(isInCast ? 'yes' : 'no');

    const hash = questionData.getQuestion.hash;
    const res = await answer({ input: { hash, isInCast }});

    setLoadingType(undefined);

    if (res.data?.answer.isCorrect) {
      setScore(score + 1);
      fetchQuestion();
    } else {
      onGameOver();
    }
  }
  
  const onGameOver = () => {
    setGameState('over');
    updateHiScore();
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

  
  if (questionError || answerError) {
    return (
      <Wrapper center variant="small">
        <Text my={10} fontSize="3xl" color="red" textAlign="center">Sorry, an error occur ☹️</Text>
        <Text mb={10} fontSize="large" textAlign="center">Error message: {questionError?.message || answerError?.message}</Text>
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
        {hiScore ? <Text my={4} textAlign="center" fontSize="large">Hi Score: {hiScore}</Text> : <></>}
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
        <Text mb={10} fontSize="large" textAlign="center">Hi Score: {hiScore}</Text>
        <Box mx="auto" display="flex" alignItems="center" justifyContent="center" width="60%">
          <Button colorScheme="blue" width="lg" onClick={startGame}>Replay</Button>
        </Box>
      </Wrapper>
    );
  }

  console.log(questionData);
  console.log(fetchingQuestion);

  const question = questionData?.getQuestion;
  const isLoading = answering || fetchingQuestion;

  return (
    <Wrapper center variant="regular">
      <TimerLabel onTimeOver={onGameOver} timeInSeconds={GAME_PART_TIME_IN_SECONDS} />
      <Text mt={2} textAlign="center" fontSize="3xl">Is this actor played on this movie ?</Text>
      {isLoading ? <LoadingQuestion /> : (
      <Box mb={4} mx="auto" display="flex" justifyContent="space-around">
        <Box display="flex" flexDirection="column">
          <Text my={2} fontWeight="bold">The actor</Text>
          <Image rounded="full" src={question?.actor.profile_url} />
          <Text mt={2}>{question?.actor.name}</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text my={2} fontWeight="bold">The movie</Text>
          <Image rounded="full" src={question?.movie.poster_url} />
          <Text mt={2}>{question?.movie.title}</Text>
        </Box>
      </Box>
      )}

      <Box mb={4} display="flex" mx="auto" justifyContent="center">
        <Box mb={4} display="flex" justifyContent="space-between" w="50%">
          <Button 
            onClick={() => onAnswer(true)} 
            isLoading={loadingType === 'yes'}
            isDisabled={isLoading}
            width="24"
            colorScheme="green"> YES 
          </Button>
          
          <Button 
            onClick={() => onAnswer(false)} 
            isLoading={loadingType === 'no'}
            isDisabled={isLoading}
            width="24"
            colorScheme="red"> NO 
          </Button>
        </Box>
      </Box>

      <Box mt={4} display="flex" alignItems="center" justifyContent="space-between">
        <Text fontSize="sm">Hi Score: {hiScore}</Text>
        <Text fontSize="sm">Current score: {score}</Text>
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Play);
