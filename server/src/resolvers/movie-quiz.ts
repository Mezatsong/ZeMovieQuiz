import { MovieProvider } from "../utils/MovieProvider";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Question } from "../entities/Question";
import { AnswerInput, Actor, Answer } from "../types";
import crypto from 'crypto';

// min and max included
const randomIntFromInterval = (min: number, max: number): number => { 
	return Math.floor(Math.random() * (max - min + 1) + min);
}

@Resolver()
export class MovieQuizResolver {

  @Query(() => Question)
  async getQuestion(): Promise<Question> {
    // 1- Let's generate a unique question hash
		const hashObj = crypto.createHash("sha256");
		const hash = hashObj.update(Date.now().toString()).digest('hex');

    // 2- Let's determine if the actor will be in the cast or not.
    const isInCast = Math.random() < 0.5;

    // 3- Let's fetch popular movies and pick one randomly
		const movies = await MovieProvider.getPopularMovies();
		const choosedMovieIndex = randomIntFromInterval(0, movies.length - 1);
		const choosedMovie = movies[ choosedMovieIndex ];
		const choosedMovieActors = await MovieProvider.getActors(choosedMovie.id);

		// 4- Let's find an actor
		let actor: Actor;

		if (isInCast) { // Then let's pick a random actor in the choosed movie acotrs list
			actor = choosedMovieActors[ randomIntFromInterval(0, choosedMovieActors.length - 1) ];
		} else {	// In that case, the actor must not be in the choosed movie actors 
 
			// let's pick a movie different than the choosed one, let's call it movie2
			let movie2Index: number; 
			do {
				movie2Index = randomIntFromInterval(0, movies.length - 1);
			} while (movie2Index === choosedMovieIndex);
			const movie2 = movies[ movie2Index ];

			// Now let's pick an actor of movie2 which is not in the choosed movie actors
			const actors = await MovieProvider.getActors(movie2.id);
			do {
				actor = actors[ randomIntFromInterval(0, actors.length - 1) ];
			} while (choosedMovieActors.findIndex(e => e.id === actor.id) !== -1);
		}

		// Finally, save question and return it
		const question = await Question.create({ hash, isInCast }).save();

		question.actor = actor;
		question.movie = choosedMovie;

		return question;
  }


  @Mutation(() => Answer, { nullable: true })
  async answer(@Arg("input") input: AnswerInput): Promise<Answer | undefined> {
    const { hash, isInCast } = input;
		let answer: Answer | undefined;
    const question = await Question.findOne({ where: { hash } });

		if (question) {
			answer = new Answer;
			answer.hash = question.hash;
			answer.isCorrect = isInCast === question.isInCast;
		}

		return answer;
  }
}
