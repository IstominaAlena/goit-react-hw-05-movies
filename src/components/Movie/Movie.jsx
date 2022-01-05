import PropTypes from "prop-types";
import { CustomPlaceholder } from "react-placeholder-image";

import { movieAPI } from "../../servicesAPI/movieAPI";

import Title from "../Title";

import s from "./Movie.module.css";

const Movie = ({ movie }) => {
  const { poster_path, title, overview, release_date, tagline } = movie;
  const imgUrl = movieAPI.getPoster(200, poster_path);

  return (
    <div className={s["movie-card"]}>
      {movie || poster_path ? (
        <img src={imgUrl} alt={title} className={s.poster} />
      ) : (
        <CustomPlaceholder width={200} height={300} text="Poster not found" />
      )}
      <div className={s["movie-info"]}>
        <Title title={title} />
        <p className={s.tagline}>{tagline}</p>
        <p className={s.overview}>{overview}</p>
        <span className={s.release}>({release_date})</span>
      </div>
    </div>
  );
};
export default Movie;
Movie.propTypes={
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    tagline: PropTypes.string,
  })
}