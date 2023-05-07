import { useCallback, useEffect, useState } from 'react';
import movieDB from '../api/movies';
import { MovieFull } from '../model/movie';
import { Cast, Credits } from '../model/credits';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

const INITIAL_STATE: MovieDetails = {
  isLoading: true,
  movieFull: undefined,
  cast: [],
};

export const useMovieDetails = (movieID: number) => {
  const [state, setState] = useState<MovieDetails>(INITIAL_STATE);

  const getMovieDetails = useCallback(async () => {
    const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieID}`);
    const castPromise = movieDB.get<Credits>(`/${movieID}/credits`);

    const [movieDetails, casts] = await Promise.all([
      movieDetailsPromise,
      castPromise,
    ]);

    setState({
      isLoading: false,
      movieFull: movieDetails.data,
      cast: casts.data.cast,
    });
  }, [movieID]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  return { ...state };
};
