import React from "react";
import PropTypes from "prop-types";

const Search = ({ searchWord, changeSearchWord }) => (
  <input
    className="search"
    type="input"
    placeholder="Type to search..."
    value={searchWord}
    onChange={(evt) => changeSearchWord(evt.target.value)}
  />
);

Search.propTypes = {
  searchWord: PropTypes.string.isRequired,
  changeSearchWord: PropTypes.func.isRequired,
};

export default Search;
