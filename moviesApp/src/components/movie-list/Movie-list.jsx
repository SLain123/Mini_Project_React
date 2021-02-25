import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination, Spin } from 'antd';
import ErrorMessage from '../errorMessage';
import MovieItem from '../movie-item';

const GetContent = ({
    movieList,
    starsList,
    totalResults,
    changePage,
    workMode,
    page,
    setRate,
}) => {
    if (movieList.length > 0) {
        const list = movieList.map((movie) => (
            <Col span={24} md={12} className='gutter-row' key={movie.id}>
                <MovieItem {...movie} starsList={starsList} setRate={setRate} />
            </Col>
        ));

        return (
            <>
                {list}
                <Pagination
                    size='small'
                    total={totalResults}
                    current={page}
                    pageSize={20}
                    showSizeChanger={false}
                    onChange={(pageNum) => changePage(pageNum)}
                />
            </>
        );
    }

    if (workMode === 'Search') {
        return (
            <p className='no-movies'>
                No movies were found for this search query
            </p>
        );
    }
    return <p className='no-movies'>No movies that you rated</p>;
};

const MovieList = (props) => {
    const { onloading, onFail } = props;

    if (onloading) {
        return <Spin tip='Loading...' size='large' />;
    }

    if (onFail) {
        return <ErrorMessage error={onFail} />;
    }

    return (
        <Row className='movie-list' gutter={[{ xs: 16, sm: 16, md: 36 }, 35]}>
            <GetContent {...props} />
        </Row>
    );
};

MovieList.propTypes = {
    onloading: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
    onFail: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

GetContent.propTypes = {
    movieList: PropTypes.arrayOf(PropTypes.object).isRequired,
    page: PropTypes.number,
    totalResults: PropTypes.number,
    changePage: PropTypes.func.isRequired,
    starsList: PropTypes.arrayOf(PropTypes.object),
    workMode: PropTypes.string,
    setRate: PropTypes.func.isRequired,
};

GetContent.defaultProps = {
    page: 1,
    totalResults: 1,
    starsList: [],
    workMode: 'Search',
};

export default MovieList;
