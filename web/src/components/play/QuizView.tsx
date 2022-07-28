import { FC, useEffect, useState } from "react";
import { Box, Button, Text, Image, Spinner } from "@chakra-ui/react";
import { useGetQuestionQuery, useAnswerMutation } from "../../generated/graphql";


interface IProps {
  timeOver: boolean,
  onError: (msg: string) => void,
  onGameOver: (score: number) => void
}

type LoadingType = 'yes' | 'no' | undefined;

export const QuizView: FC<IProps> = props => {
  
  const [score, setScore] = useState(0);
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
    if (questionError) {
      props.onError(questionError.message);
    } else if (answerError?.message) {
      props.onError(answerError.message);
    }
  }, [questionError, answerError]);

  useEffect(() => {
    if (props.timeOver) {
      props.onGameOver(score);
    }
  }, [props.timeOver]);

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
      props.onGameOver(score);
    }
  }
  
  const question = questionData?.getQuestion;
  const isLoading = answering || fetchingQuestion;

  return (
    <>
    <Text mt={2} textAlign="center" fontSize="3xl">Is this actor played on this movie ?</Text>
      {isLoading ? (
        <Box my={10} minH={250} mx="auto" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Spinner size="lg" colorScheme="blue" />
          <Text m={4} textAlign="center" fontSize="large">Loading...</Text>
        </Box>
      ) : (
      <Box mb={4} minH={250} mx="auto" display="flex" justifyContent="center">
        <Box display="flex" mr={10} flexDirection="column" alignItems="center">
          <Text my={2} fontWeight="bold">The actor</Text>
          <Image style={{width: 200}} src={question?.actor.profile_url} alt="The actor" />
          <Text mt={2}>{question?.actor.name}</Text>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Text my={2} fontWeight="bold">The movie</Text>
          <Image style={{width: 200}} src={question?.movie.poster_url} alt="The movie" />
          <Text mt={2}>{question?.movie.title}</Text>
        </Box>
      </Box>
      )}

      <Box mb={4} mt={10} display="flex" mx="auto" justifyContent="center">
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
    </>
  );
};
