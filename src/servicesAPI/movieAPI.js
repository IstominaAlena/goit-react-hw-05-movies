import axios from "axios";
import { fetchingDataAPI } from "./fetchingDataAPI";

const imgURL = fetchingDataAPI.imgURL;

const instance = axios.create({
  baseURL: fetchingDataAPI.baseURL,
  params: {
    api_key: fetchingDataAPI.api_key,
  },
});

const getTrendingMovieByDay = () => {
  return instance.get("trending/movie/day");
};

const getPoster = (width, posterPath) => {
  return `${imgURL}/w${width}/${posterPath}`;
};

const getGenresList = () => {
  return instance.get("/genre/movie/list");
};

const getSerchedMovies = (query, page) => {
  return instance.get("search/movie", {
    params: {
      query,
      page,
    },
  });
};

const getMovieById = (id) => {
  return instance.get(`/movie/${id}`);
};

const getCastById = (id) => {
  return instance.get(`/movie/${id}/credits`);
};

const getReviewsById = (id) => {
  return instance.get(`/movie/${id}/reviews`);
};

export const movieAPI = {
  getTrendingMovieByDay,
  getPoster,
  getGenresList,
  getSerchedMovies,
  getMovieById,
  getCastById,
  getReviewsById,
};
