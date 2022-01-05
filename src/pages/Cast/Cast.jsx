import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CastListCreator from "../../components/CastListCreator";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner"

import { movieAPI } from "../../servicesAPI/movieAPI";

const Cast = () => {
  const { movieId } = useParams();
  const [state, setState] = useState({
    cast: [],
    status: "idle",
    error: "",
  });

  const { cast, status, error } = state;

  useEffect(() => {
    async function getMovieCast() {
      setState({
        ...state,
        status: "pending",
      });
      try {
        const result = await movieAPI.getCastById(movieId);
        setState({
          ...state,
          cast: [...result.data.cast],
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

    getMovieCast();
  }, [movieId]);

  return (
    <>
      {status === "pending" && <Spinner />}
      {status === "rejected" && <Error error={error} />}

      <CastListCreator array={cast} />
    </>
  );
};
export default Cast;
