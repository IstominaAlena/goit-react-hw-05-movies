import { useState } from "react";
import { toast } from "react-toastify";

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
      <Input
        value={query}
        onChange={onInputChange}
        type="text"
        placeholderValue="Search images and photos"
        autoFocus={true}
        autoComplete="off"
      />

      <Button type="submit" text={"Search"} className="search" />
    </form>
  );
};
export default SearchForm;
