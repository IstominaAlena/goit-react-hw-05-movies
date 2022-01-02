import { memo } from "react";
import { CustomPlaceholder } from "react-placeholder-image";

import PropTypes from "prop-types";

import { movieAPI } from "../../servicesAPI/movieAPI";

import s from "./CastListCreator.module.css";

const CastListCreator = ({ array }) => {
  const items = array.map(({ id, name, profile_path, character }) => {
    const imgUrl = movieAPI.getPoster(200, profile_path);
    return (
      <li key={id} className={s.item}>
        {profile_path ? (
          <img src={imgUrl} alt={name} className={s.profile} />
        ) : (
          <CustomPlaceholder width={200} height={300} text="Photo not found" />
        )}
        <h2 className={s.name}>{name}</h2>
        <p className={s.character}>{character}</p>
      </li>
    );
  });
  return <ul className={s.list}>{items}</ul>;
};
export default memo(CastListCreator);
