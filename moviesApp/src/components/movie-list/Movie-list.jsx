import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Spin, Alert, Pagination } from "antd";
import MovieItem from "../movie-item";

const statusChecker = (onloading, onFail) => {
  if (onloading) {
    return <Spin tip="Loading..." size="large" />;
  }
  if (!onloading && onFail) {
    return (
      <Alert
        type="error"
        message={`Error: Can't download data! ${onFail}`}
        description="An error occurred while downloading data from a remote server"
        banner
      />
    );
  }
  return false;
};

const MainContent = ({ movieSearchList, page, totalResults, changePage }) => {
  const movieListItems = movieSearchList.map((movie) => (
    <Col span={24} md={12} className="gutter-row" key={movie.id}>
      <MovieItem {...movie} />
    </Col>
  ));
  const searchResult =
    movieSearchList.length > 0 ? (
      <>
        {movieListItems}
        <Pagination
          size="small"
          total={totalResults}
          current={page}
          pageSize={20}
          showSizeChanger={false}
          onChange={(pageNum) => changePage(pageNum)}
        />
      </>
    ) : (
      <p className="no-movies">No movies were found for this search query</p>
    );

  return searchResult;
};

const MovieList = ({
  movieSearchList,
  onloading,
  onFail,
  page,
  totalResults,
  changePage,
}) => {
  const checkStatus = statusChecker(onloading, onFail);
  if (checkStatus) {
    return checkStatus;
  }

  return (
    <Row className="movie-list" gutter={[{ xs: 16, sm: 16, md: 36 }, 35]}>
      <MainContent
        movieSearchList={movieSearchList}
        onloading={onloading}
        onFail={onFail}
        page={page}
        totalResults={totalResults}
        changePage={changePage}
      />
    </Row>
  );
};

MovieList.propTypes = {
  movieSearchList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onloading: PropTypes.bool.isRequired,
  onFail: PropTypes.bool.isRequired,
  page: PropTypes.number,
  totalResults: PropTypes.number,
  changePage: PropTypes.func.isRequired,
};

MovieList.defaultProps = {
  page: 1,
  totalResults: 1,
};

export default MovieList;
