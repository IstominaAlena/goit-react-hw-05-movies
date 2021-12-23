import PropTypes from "prop-types";
import { useState } from "react";
import { CustomPlaceholder } from "react-placeholder-image";

import { movieAPI } from "../../servicesAPI/movieAPI";

import Title from "../Title";

import s from "./Movie.module.css";

const Movie = ({ movie }) => {
  const { poster_path, title, overview, release_date, tagline } = movie;
  const imgUrl = movieAPI.getPoster(200, poster_path);

  return (
    <>
      {poster_path ? (
        <img src={imgUrl} alt={title} className={s.poster} />
      ) : (
        <CustomPlaceholder width={200} height={300} text="Poster not found" />
      )}

      <Title title={title} />
      <span>{release_date}</span>
      <p>{tagline}</p>
      <p>{overview}</p>
    </>
  );
};
export default Movie;
