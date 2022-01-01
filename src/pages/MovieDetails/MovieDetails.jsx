import { useState, useEffect } from "react";
import {
  useParams,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";

import SectionWrapper from "../../components/SectionWrapper";
import Movie from "../../components/Movie";
import RoutsForMovie from "../../components/Routs/RoutsForMovie";
import Button from "../../components/Button";

import { movieAPI } from "../../servicesAPI/movieAPI";

import s from "./MovieDetails.module.css";

const MovieDetails = () => {
  const [state, setState] = useState({
    movie: {},
    status: "idle",
    error: "",
  });

  const { movie, status, error } = state;

  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  function goBack() {
    if (location.state?.from) {
      history.push(location.state.from);
      return;
    }
    history.push("/movies");
  }

  useEffect(() => {
    async function showMovie() {
      setState({
        ...state,
        status: "pending",
      });
      try {
        const result = await movieAPI.getMovieById(movieId);
        setState({
          ...state,
          movie: { ...result.data },
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
    showMovie();
  }, []);

  return (
    <>
      {status === "pending" && <h1>Loading...</h1>}

      <Button type="button" text="Go back" onClick={goBack} />

      <SectionWrapper>
        <Movie movie={movie} />
      </SectionWrapper>

      <SectionWrapper>
        <NavLink
          to={{
            pathname: `${url}/cast`,
            state: { from: location.state?.from },
          }}
        >
          Cast
        </NavLink>
        <NavLink
          to={{
            pathname: `${url}/reviews`,
            state: { from: location.state?.from },
          }}
        >
          Reviews
        </NavLink>
      </SectionWrapper>

      <RoutsForMovie />
    </>
  );
};
export default MovieDetails;
