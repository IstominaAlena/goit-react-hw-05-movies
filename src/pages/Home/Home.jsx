import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

import SectionWrapper from "../../components/SectionWrapper";
import Title from "../../components/Title";
import MoviesListCreator from "../../components/MoviesListCreator";

import { movieAPI } from "../../servicesAPI/movieAPI";
// import s from "./Home.module.css";

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
    <SectionWrapper>
      <Title title={"Trending today"} />
      <MoviesListCreator array={movies} />
    </SectionWrapper>
  );
};

export default Home;
