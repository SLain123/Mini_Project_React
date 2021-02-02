/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Rate } from "antd";
import { ContextConsumer } from "../../services/ContextProvider";
import MovieService from "../../services/movies-service";
import Gender from "../gender";
import cutsOverview from "../../utils/cutsOverview";
import image from "./ex.jpg";

const getRightDataFormat = (date) => {
  if (date === "") {
    return "Release date unknown";
  }
  return format(new Date(date), "LLLL d, yyyy");
};

const getRateStatus = (currentId, movieRateList) => {
  let resultRate = 0;

  movieRateList.forEach(({ id, rating }) => {
    if (id === currentId) {
      resultRate = rating;
    }
  });

  return resultRate;
};

const MovieItem = (props) => {
  const {
    backdrop_path: imgPath,
    title,
    genre_ids: genderArr,
    overview,
    release_date: date,
    id,
  } = props;

  return (
    <ContextConsumer>
      {({ movieRateList, getGuestRateList, cleanGuestRateList, workMode }) => (
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
              MovieService.setRate(num, id);
              cleanGuestRateList();
              getGuestRateList(1);
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
};

MovieItem.defaultProps = {
  backdrop_path: image,
  release_date: "",
};

export default MovieItem;
