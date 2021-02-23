import React from "react";
import PropTypes from "prop-types";
import { ContextConsumer } from "../contextProvider/ContextProvider";

const SearchContent = ({ workMode, searchWord, changeSearchWord }) =>
  workMode === "Search" ? (
    <input
      className="search"
      type="input"
      placeholder="Type to search..."
      value={searchWord}
      onChange={(evt) => changeSearchWord(evt.target.value)}
    />
  ) : null;

const Search = ({ searchWord, changeSearchWord }) => (
  <ContextConsumer>
    {({ workMode }) => (
      <SearchContent
        workMode={workMode}
        searchWord={searchWord}
        changeSearchWord={changeSearchWord}
      />
    )}
  </ContextConsumer>
);

Search.propTypes = {
  searchWord: PropTypes.string.isRequired,
  changeSearchWord: PropTypes.func.isRequired,
};

SearchContent.propTypes = {
  searchWord: PropTypes.string.isRequired,
  changeSearchWord: PropTypes.func.isRequired,
  workMode: PropTypes.string,
};

SearchContent.defaultProps = {
  workMode: "Search",
};

export default Search;
