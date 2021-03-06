import { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { CustomPlaceholder } from "react-placeholder-image";

import PropTypes from "prop-types";

import { movieAPI } from "../../servicesAPI/movieAPI";
import s from "./MoviesListCreator.module.css";

const MoviesListCreator = ({ array }) => {
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  useEffect(() => {
    async function getMovieGenres() {
      try {
        const result = await movieAPI.getGenresList();
        setGenres((prev) => [...prev, ...result.data.genres]);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieGenres();
  }, []);

  const items = array.map((e) => {
    const { poster_path, genre_ids, id, title, vote_average } = e;
    const imgUrl = movieAPI.getPoster(200, poster_path);

    const genresList = genre_ids
      .flatMap((id) => genres.filter((obj) => obj.id === id))
      .map((genre) => <span key={genre.id}>{genre.name}</span>);

    return (
      <li key={id} className={s.item}>
        <Link
          to={{
            pathname: `/movies/${id}`,
            state: { from: location },
          }}
          className={s.link}
        >
          {poster_path ? (
            <img src={imgUrl} alt={title} className={s.poster} />
          ) : (
            <CustomPlaceholder
              width={200}
              height={300}
              text="Poster not found"
            />
          )}
          <h2 className={s.title}>{title}</h2>
          <p className={s.rating}>{vote_average}</p>
          <p className={s.genres}>{genresList}</p>
        </Link>
      </li>
    );
  });
  return <ul className={s.list}>{items}</ul>;
};

export default memo(MoviesListCreator);

MoviesListCreator.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      id: PropTypes.number,
      title: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ),
};
