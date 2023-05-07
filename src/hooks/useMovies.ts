import { useEffect, useState } from 'react';
import movieDB from '../api/movies';
import { Movie, MovieDBResponse } from '../model/movie';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

const INITIAL_STATE: MoviesState = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: [],
};

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>(INITIAL_STATE);

  const getMovies = async () => {
    const nowPlaynignPromise = movieDB.get<MovieDBResponse>('/now_playing');
    const popularPromise = movieDB.get<MovieDBResponse>('/popular');
    const topRatedPromise = movieDB.get<MovieDBResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MovieDBResponse>('/upcoming');

    const responses = await Promise.all([
      nowPlaynignPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      nowPlaying: responses[0].data.results,
      popular: responses[1].data.results,
      topRated: responses[2].data.results,
      upcoming: responses[3].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return { ...moviesState, isLoading };
};
