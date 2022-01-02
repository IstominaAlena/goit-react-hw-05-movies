import { useState } from "react";
import { toast } from "react-toastify";
import { IconContext } from "react-icons";
import { BsFillEyeFill } from "react-icons/bs";

import Title from "../../components/Title";
import Input from "../Input";
import Button from "../Button";

import s from "./SearchForm.module.css";

const SearchForm = (props) => {
  const [query, setQuery] = useState("");

  function onInputChange(e) {
    setQuery(e.target.value);
  }

  function onFormSubmit(e) {
    e.preventDefault();

    if (query.trim() === "") {
      toast.warn("Please, enter your request");
    }

    props.onSubmit(query);
    setQuery("");
  }

  return (
    <form className={s.form} onSubmit={onFormSubmit}>
      <Title title={"Search movie"} />
      <Input
        value={query}
        onChange={onInputChange}
        type="text"
        autoFocus={true}
        autoComplete="off"
      />

      <Button
        type="submit"
        text={
          <IconContext.Provider
            value={{
              color: "#0abab5",
              size: "20px",
            }}
          >
            <BsFillEyeFill />
          </IconContext.Provider>
        }
        className="search"
      />
    </form>
  );
};
export default SearchForm;
