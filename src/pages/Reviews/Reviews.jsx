import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SectionWrapper from "../../components/SectionWrapper";
import ReviewsListCreator from "../../components/ReviewsListCreator";

import PropTypes from "prop-types";
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
        console.log(result.data.results);
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
    <SectionWrapper>
      <ReviewsListCreator array={reviews} />
    </SectionWrapper>
  );
};
export default Reviews;
