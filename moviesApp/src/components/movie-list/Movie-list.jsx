import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Spin, Alert, Pagination } from "antd";
import MovieItem from "../movie-item";

const MainContent = ({
  movieListArr,
  onLoad,
  onFail,
  page,
  totalResults,
  changePage,
}) => {
  if (onLoad) {
    return <Spin tip="Loading..." size="large" />;
  }
  if (!onLoad && onFail) {
    return (
      <Alert
        type="error"
        message={`Error: Can't download data! ${onFail}`}
        description="An error occurred while downloading data from a remote server"
        banner
      />
    );
  }

  const movieListItems = movieListArr.map((movie) => (
    <Col span={24} md={12} className="gutter-row" key={movie.id}>
      <MovieItem {...movie} />
    </Col>
  ));
  const searchResult =
    movieListArr.length > 0 ? (
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
  movieListArr,
  onLoad,
  onFail,
  page,
  totalResults,
  changePage,
}) => (
  <Row className="movie-list" gutter={[{ xs: 16, sm: 16, md: 36 }, 35]}>
    <MainContent
      movieListArr={movieListArr}
      onLoad={onLoad}
      onFail={onFail}
      page={page}
      totalResults={totalResults}
      changePage={changePage}
    />
  </Row>
);

MovieList.propTypes = {
  movieListArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLoad: PropTypes.bool.isRequired,
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
