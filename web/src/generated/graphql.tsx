import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Actor = {
  __typename?: 'Actor';
  id: Scalars['ID'];
  name: Scalars['String'];
  profile_url: Scalars['String'];
};

export type Answer = {
  __typename?: 'Answer';
  hash: Scalars['ID'];
  isCorrect: Scalars['Boolean'];
};

export type AnswerInput = {
  hash: Scalars['String'];
  isInCast: Scalars['Boolean'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['ID'];
  overview: Scalars['String'];
  poster_url: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  answer: Answer;
  login?: Maybe<User>;
  register: User;
};


export type MutationAnswerArgs = {
  input: AnswerInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getByUsername?: Maybe<User>;
  getQuestion: Question;
};


export type QueryGetByUsernameArgs = {
  username: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  actor: Actor;
  hash: Scalars['ID'];
  movie: Movie;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AnswerMutationVariables = Exact<{
  input: AnswerInput;
}>;


export type AnswerMutation = { __typename?: 'Mutation', answer: { __typename?: 'Answer', hash: string, isCorrect: boolean } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', email: string, username: string, firstName: string, lastName: string, createdAt: string, updatedAt: string } | null };

export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', email: string, username: string, firstName: string, lastName: string, createdAt: string, updatedAt: string } };

export type GetByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetByUsernameQuery = { __typename?: 'Query', getByUsername?: { __typename?: 'User', id: number, username: string, firstName: string, lastName: string, email: string, createdAt: string, updatedAt: string } | null };

export type GetQuestionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuestionQuery = { __typename?: 'Query', getQuestion: { __typename?: 'Question', hash: string, movie: { __typename?: 'Movie', id: string, poster_url: string, title: string, overview: string }, actor: { __typename?: 'Actor', id: string, name: string, profile_url: string } } };


export const AnswerDocument = gql`
    mutation Answer($input: AnswerInput!) {
  answer(input: $input) {
    hash
    isCorrect
  }
}
    `;

export function useAnswerMutation() {
  return Urql.useMutation<AnswerMutation, AnswerMutationVariables>(AnswerDocument);
};
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    email
    username
    firstName
    lastName
    createdAt
    updatedAt
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: UserInput!) {
  register(input: $input) {
    email
    username
    firstName
    lastName
    createdAt
    updatedAt
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetByUsernameDocument = gql`
    query GetByUsername($username: String!) {
  getByUsername(username: $username) {
    id
    username
    firstName
    lastName
    email
    createdAt
    updatedAt
  }
}
    `;

export function useGetByUsernameQuery(options: Omit<Urql.UseQueryArgs<GetByUsernameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetByUsernameQuery>({ query: GetByUsernameDocument, ...options });
};
export const GetQuestionDocument = gql`
    query getQuestion {
  getQuestion {
    hash
    movie {
      id
      poster_url
      title
      overview
    }
    actor {
      id
      name
      profile_url
    }
  }
}
    `;

export function useGetQuestionQuery(options?: Omit<Urql.UseQueryArgs<GetQuestionQueryVariables>, 'query'>) {
  return Urql.useQuery<GetQuestionQuery>({ query: GetQuestionDocument, ...options });
};