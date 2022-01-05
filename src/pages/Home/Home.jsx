import { useState, useEffect } from "react";

import Title from "../../components/Title";
import MoviesListCreator from "../../components/MoviesListCreator";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";

import { movieAPI } from "../../servicesAPI/movieAPI";

const Home = () => {
  const [state, setState] = useState({
    movies: [],
    status: "idle",
    error: "",
  });
  const { movies, status, error } = state;

  useEffect(() => {
    async function getMovies() {
      setState({
        ...state,
        status: "pending",
      });
      try {
        const result = await movieAPI.getTrendingMovieByDay();
        setState((prev) => ({
          ...state,
          movies: [...prev.movies, ...result.data.results],
          status: "resolved",
        }));
      } catch (error) {
        setState({
          ...state,
          error: error.message,
          status: "rejected",
        });
      }
    }
    getMovies();
  }, []);

  return (
    <>
      {status === "pending" && <Spinner />}
      {status === "rejected" && <Error error={error} />}

      <Title title={"Trending today"} />
      <MoviesListCreator array={movies} />
    </>
  );
};

export default Home;
