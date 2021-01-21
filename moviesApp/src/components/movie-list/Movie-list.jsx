import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import MovieItem from '../movie-item';

const MovieList = ({ movieListArr }) => {
    const movieListItems = movieListArr.map((movie) => (
        <Col span={24} md={12} className='gutter-row' key={movie.id}>
            <MovieItem {...movie} />
        </Col>
    ));
    return (
        <>
            <Row className='movie-list' gutter={[36, 35]}>
                {movieListItems}
            </Row>
        </>
    );
};

MovieList.propTypes = {
    movieListArr: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
