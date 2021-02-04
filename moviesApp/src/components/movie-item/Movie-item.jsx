/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Rate } from "antd";
import getRightDataFormat from "../../utils/getRightFormat";
import getRateStatus from "../../utils/getRateStatus";
import { ContextConsumer } from "../../services/ContextProvider";
import Gender from "../gender";
import cutsOverview from "../../utils/cutsOverview";
import image from "./ex.jpg";

const MovieItem = (props) => {
  const {
    backdrop_path: imgPath,
    title,
    genre_ids: genderArr,
    overview,
    release_date: date,
    id,
    movieRateList,
  } = props;

  return (
    <ContextConsumer>
      {({ setRate }) => (
        <div className="movie-item">
          <img
            src={image}
            alt="movie logo"
            className="movie-item__img"
            path={imgPath}
          />
          <div className="movie-item__info">
            <h2 className="movie-item__title">{cutsOverview(title, 40)}</h2>
            <p className="movie-item__data">{getRightDataFormat(date)}</p>
            <Gender genderArr={genderArr} id={id} />
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
        </div>
      )}
    </ContextConsumer>
  );
};

MovieItem.propTypes = {
  backdrop_path: PropTypes.string,
  title: PropTypes.string.isRequired,
  genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  id: PropTypes.number.isRequired,
  movieRateList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

MovieItem.defaultProps = {
  backdrop_path: image,
  release_date: "",
};

export default MovieItem;
