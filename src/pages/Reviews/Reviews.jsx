import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ReviewsListCreator from "../../components/ReviewsListCreator";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner"
import { movieAPI } from "../../servicesAPI/movieAPI";

import s from "./Reviews.module.css";

const Reviews = () => {
  const { movieId } = useParams();
  const [state, setState] = useState({
    reviews: [],
    status: "idle",
    error: "",
  });
  const { reviews, status, error } = state;

  useEffect(() => {
    async function getMovieCast() {
      setState({
        ...state,
        status: "pending",
      });
      try {
        const result = await movieAPI.getReviewsById(movieId);
        setState({
          ...state,
          reviews: [...result.data.results],
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

      {reviews.length > 0 || status === "pending" ? (
        <ReviewsListCreator array={reviews} />
      ) : (
        <p className={s.text}>Sorry, there isn't any reviews</p>
      )}
    </>
  );
};
export default Reviews;
