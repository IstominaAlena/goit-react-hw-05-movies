import { useState, useEffect } from "react";
import {
  useParams,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { IconContext } from "react-icons";
import { IoArrowUndoOutline } from "react-icons/io5";

import Movie from "../../components/Movie";
import RoutsForMovie from "../../components/Routs/RoutsForMovie";
import Button from "../../components/Button";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner"

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
      {status === "pending" && <Spinner />}
      {status === "rejected" && <Error error={error} />}

      <div className={s.container}>
        <Button
          type="button"
          text={
            <IconContext.Provider
              value={{
                color: "#0abab5",
                size: "20px",
              }}
            >
              <IoArrowUndoOutline />
            </IconContext.Provider>
          }
          onClick={goBack}
          className={"go-back"}
        />

        <Movie movie={movie} />
      </div>

      <div className={s["link-container"]}>
        <NavLink
          className={s.link}
          activeClassName={s.active}
          to={{
            pathname: `${url}/cast`,
            state: { from: location.state?.from },
          }}
        >
          Cast
        </NavLink>
        <NavLink
          className={s.link}
          activeClassName={s.active}
          to={{
            pathname: `${url}/reviews`,
            state: { from: location.state?.from },
          }}
        >
          Reviews
        </NavLink>
      </div>

      <RoutsForMovie />
    </>
  );
};
export default MovieDetails;
