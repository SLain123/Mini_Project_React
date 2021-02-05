/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const getGenreTitle = (genreArr, genresListPattern) => {
  const result = [];
  genreArr.forEach((genId) => {
    genresListPattern.forEach(
      ({ id, name }) => id === genId && result.push(name)
    );
  });

  return result.slice(0, 3);
};

const Genre = ({ genreArr, id, genresListPattern, onFailGenres }) => {
  const finallGenreArr = getGenreTitle(genreArr, genresListPattern);

  return (
    <div className="genre">
      {finallGenreArr.map((genre) => (
        <p key={`${id}-${genre}`} className="genre__text">
          {genre}
        </p>
      ))}
    </div>
  );
};

Genre.propTypes = {
  genreArr: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.number.isRequired,
  genresListPattern: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFailGenres: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

Genre.defaultProps = {
  onFailGenres: false,
};

export default Genre;
