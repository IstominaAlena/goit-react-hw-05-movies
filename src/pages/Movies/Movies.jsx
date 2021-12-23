import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import SectionWrapper from "../../components/SectionWrapper";
import SearchForm from "../../components/SearchForm";
import MoviesListCreator from "../../components/MoviesListCreator";
import Button from "../../components/Button";

import { movieAPI } from "../../servicesAPI/movieAPI";

import s from "./Movies.module.css";

const Movies = () => {
  const [state, setState] = useState({
    error: "",
    status: "idle",
    movies: [],
    page: 1,
  });

  const { error, status, movies, page } = state;

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    async function searchMoviesByWords() {
      setState({
        ...state,
        status: "pending",
      });
      try {
        const result = await movieAPI.getSerchedMovies(query, page);

        setState({
          ...state,
          movies: [...result.data.results],
          page: result.data.page,
          status: "resolved",
        });
      } catch (error) {
        setState({
          ...state,
          error: error.message,
          status: "rejected",
        });
      }
    }

    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    if (query) {
      searchMoviesByWords();
    }
  }, [location.search, page]);

  function formSubmitHandler(searchQuery) {
    history.push({
      pathname: location.pathname,
      search: `q=${searchQuery}`,
    });
  }

  function handleClick() {
    setState((prev) => ({
      ...state,
      page: prev.page + 1,
      status: "pending",
    }));
  }

  return (
    <SectionWrapper>
      <SearchForm onSubmit={formSubmitHandler} />

      <MoviesListCreator array={movies} />

      <Button
        type="button"
        text="Load more"
        onClick={handleClick}
        className={"load-more"}
      />
    </SectionWrapper>
  );
};

export default Movies;
