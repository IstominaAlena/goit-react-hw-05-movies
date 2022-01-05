import { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import SearchForm from "../../components/SearchForm";
import MoviesListCreator from "../../components/MoviesListCreator";
import Button from "../../components/Button";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner"

import { movieAPI } from "../../servicesAPI/movieAPI";

import s from "./Movies.module.css";

const Movies = () => {
  const [state, setState] = useState({
    error: "",
    status: "idle",
    movies: [],
    page: 1,
    totalPages: 1,
  });

  const { error, status, movies, page, totalPages } = state;

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
        if (!result.data.results.length) {
          toast.error("Sorry we can't find anything");
        }
        setState((prev) => ({
          ...state,
          movies: [...prev.movies, ...result.data.results],
          page: result.data.page,
          status: "resolved",
          totalPages: result.data.total_pages,
        }));
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
    setState({
      ...state,
      movies: [],
      page: 1,
    });
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
    <>
      <SearchForm onSubmit={formSubmitHandler} />

      {status === "pending" && <Spinner />}
      {status === "rejected" && <Error error={error} />}

      {movies.length > 0 && <MoviesListCreator array={movies} />}
      {movies.length > 0 && page < totalPages && status !== "pending" && (
        <Button
          type="button"
          text="Load more"
          onClick={handleClick}
          className={"load-more"}
        />
      )}
      {page === totalPages && status === "resolved" && (
        <p className={s.text}>
          We're sorry, but you've reached the end of search results.
        </p>
      )}
    </>
  );
};

export default Movies;
