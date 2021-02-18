import React from "react";
import PropTypes from "prop-types";
import { Rate } from "antd";
import getRightDataFormat from "../../utils/getRightFormat";
import getRateStatus from "../../utils/getRateStatus";
import { ContextConsumer } from "../../services/ContextProvider";
import Genre from "../genre";
import CyrcleRate from "../cyrcleRate";
import cutsOverview from "../../utils/cutsOverview";

const MovieItem = ({
  poster_path: imgPath,
  title,
  genre_ids: genreArr,
  overview,
  release_date: date,
  id,
  movieRateList,
  vote_average: vote,
}) => {
  const imgUrl =
    imgPath === null ? "/sH6030EbSzOUTFFZrpnTdSpeNP0.jpg" : imgPath;

  return (
    <ContextConsumer>
      {({ setRate, genresListPattern, onFailGenres }) => (
        <div className="movie-item">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={`https://image.tmdb.org/t/p/w1280${imgUrl}`}
            />
            <img
              className="movie-item__img"
              srcSet={`https://image.tmdb.org/t/p/w300${imgUrl}`}
              alt="movie logo"
              width="183"
              height="292"
            />
          </picture>
          <div className="movie-item__info">
            <h2 className="movie-item__title">{cutsOverview(title, 40)}</h2>
            <p className="movie-item__data">{getRightDataFormat(date)}</p>
            <Genre
              genreArr={genreArr}
              genresListPattern={genresListPattern}
              onFailGenres={onFailGenres}
              id={id}
            />
          </div>
          <p className="movie-item__overview">{cutsOverview(overview, 165)}</p>
          <Rate
            allowClear={false}
            allowHalf
            defaultValue={getRateStatus(id, movieRateList)}
            className="movie-item__rate"
            count={10}
            onChange={(num) => {
              setRate(num, id);
            }}
          />
          <CyrcleRate vote={vote} />
        </div>
      )}
    </ContextConsumer>
  );
};

MovieItem.propTypes = {
  poster_path: PropTypes.string,
  title: PropTypes.string.isRequired,
  genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  id: PropTypes.number.isRequired,
  movieRateList: PropTypes.arrayOf(PropTypes.object).isRequired,
  vote_average: PropTypes.number,
};

MovieItem.defaultProps = {
  poster_path: null,
  release_date: "",
  vote_average: 0,
};

export default MovieItem;
