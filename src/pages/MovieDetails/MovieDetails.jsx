import { useState, useEffect } from "react";
import {
  useParams,
  NavLink,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import SectionWrapper from "../../components/SectionWrapper";
import Movie from "../../components/Movie";
import Cast from "../../pages/Cast";
import Reviews from "../../pages/Reviews";

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
      <SectionWrapper>
        <Movie movie={movie} />
      </SectionWrapper>

      <SectionWrapper>
        <NavLink to={`${url}/cast`}>Cast</NavLink>
        <NavLink to={`${url}/reviews`}>Reviews</NavLink>
      </SectionWrapper>

      <SectionWrapper>
        <Switch>
          <Route path="/movies/:movieId/cast">
            <Cast />
          </Route>

          <Route path="/movies/:movieId/reviews">
            <Reviews />
          </Route>
        </Switch>
      </SectionWrapper>
    </>
  );
};
export default MovieDetails;
