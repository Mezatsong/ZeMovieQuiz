import { Movie, Actor } from "../types";
import config from "../constants";
import axios from "axios";

const THEMOVIEDB_API_BASE_URI = "https://api.themoviedb.org/3";

const movieApiUrl = (path: string): string => `${THEMOVIEDB_API_BASE_URI}${path}?api_key=${config.themoviedb_apiKey}`;

const movieImageUrl = (path: string): string => `https://image.tmdb.org/t/p/w500${path}`;

export abstract class MovieProvider {

	static getPopularMovies(): Promise<Movie[]> {
		return axios.get(movieApiUrl('/movie/popular'))
			.then(res => res.data.results as any[])
			.then(movies => movies.map((item: any) => ({
					...item, 
					poster_url: movieImageUrl(item.poster_path)
			} as Movie)));
	}

	static getActors(movieId: number): Promise<Actor[]> {
		return axios.get(movieApiUrl(`/movie/${movieId}/credits`))
			.then(res => res.data.cast as any[])
			.then(actors => actors.map(item => ({
					...item, 
					profile_url: movieImageUrl(item.profile_path)
			} as Actor)));
	}

}
