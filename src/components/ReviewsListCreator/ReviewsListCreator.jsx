import { memo } from "react";
import PropTypes from "prop-types";

import s from "./ReviewsListCreator.module.css";
const ReviewsListCreator = ({ array }) => {
  const items = array.map(({ id, author, content }) => {
    return (
      <li key={id} className={s.item}>
        <h2 className={s.author}>{author}</h2>
        <p className={s.content}>{content}</p>
      </li>
    );
  });
  return <ul className={s.list}>{items}</ul>;
};
export default memo(ReviewsListCreator);

ReviewsListCreator.propTypes={
  array: PropTypes.arrayOf(
    PropTypes.shape({
      profile_path: PropTypes.string,
      id: PropTypes.number,
      author: PropTypes.string,
      content: PropTypes.string,
    })
  ),
}