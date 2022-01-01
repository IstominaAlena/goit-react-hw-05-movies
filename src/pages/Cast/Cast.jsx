import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import SectionWrapper from "../../components/SectionWrapper";
import CastListCreator from "../../components/CastListCreator";
import Error from "../../components/Error";

import { movieAPI } from "../../servicesAPI/movieAPI";

import s from "./Cast.module.css";

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
    <SectionWrapper>
      {status === "pending" && <h1>Loading...</h1>}

      {status === "rejected" && <Error error={error} />}
      <CastListCreator array={cast} />
    </SectionWrapper>
  );
};
export default Cast;
