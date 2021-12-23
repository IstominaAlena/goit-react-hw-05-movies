import { memo } from "react";
import PropTypes from "prop-types";
import { movieAPI } from "../../servicesAPI/movieAPI";

import s from "./ReviewsListCreator.module.css";
const ReviewsListCreator = ({ array }) => {
  const items = array.map(({ id, author, content }) => {
    return (
      <li key={id}>
        <h2>{author}</h2>
        <p>{content}</p>
      </li>
    );
  });
  return <ul className={s.list}>{items}</ul>;
};
export default ReviewsListCreator;
