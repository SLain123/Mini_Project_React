import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination, Spin } from 'antd';
import ErrorMessage from '../errorMessage';
import { ContextConsumer } from '../contextProvider/ContextProvider';
import MovieItem from '../movie-item';

const MainContent = ({
    movieSearchList,
    page,
    totalResults,
    changePage,
    workMode,
    movieRateList,
    onloadingRate,
    onFailDownloadRate,
}) => {
    const movieList = workMode === 'Search' ? movieSearchList : movieRateList;
    const pagination =
        workMode === 'Search' ? (
            <Pagination
                size='small'
                total={totalResults}
                current={page}
                pageSize={20}
                showSizeChanger={false}
                onChange={(pageNum) => changePage(pageNum)}
            />
        ) : null;

    const nullMessage =
        workMode === 'Search' ? (
            <p className='no-movies'>
                No movies were found for this search query
            </p>
        ) : (
            <p className='no-movies'>No movies that you rated</p>
        );

    const movieListItems = movieList.map((movie) => (
        <Col span={24} md={12} className='gutter-row' key={movie.id}>
            <MovieItem {...movie} movieRateList={movieRateList} />
        </Col>
    ));

    const searchResult =
        movieList.length > 0 ? (
            <>
                {movieListItems}
                {pagination}
            </>
        ) : (
            nullMessage
        );

    if (onloadingRate && workMode === 'Rated') {
        return <Spin tip='Loading...' size='large' />;
    }

    if (onFailDownloadRate && workMode === 'Rated') {
        return <ErrorMessage error={onFailDownloadRate} />;
    }

    return searchResult;
};

const MovieList = ({ movieSearchList, page, totalResults, changePage }) => (
    <ContextConsumer>
        {({ workMode, movieRateList, onloadingRate, onFailDownloadRate }) => (
            <Row
                className='movie-list'
                gutter={[{ xs: 16, sm: 16, md: 36 }, 35]}
            >
                <MainContent
                    movieSearchList={movieSearchList}
                    page={page}
                    totalResults={totalResults}
                    changePage={changePage}
                    workMode={workMode}
                    movieRateList={movieRateList}
                    onloadingRate={onloadingRate}
                    onFailDownloadRate={onFailDownloadRate}
                />
            </Row>
        )}
    </ContextConsumer>
);
MovieList.propTypes = {
    movieSearchList: PropTypes.arrayOf(PropTypes.object).isRequired,
    page: PropTypes.number,
    totalResults: PropTypes.number,
    changePage: PropTypes.func.isRequired,
};

MovieList.defaultProps = {
    page: 1,
    totalResults: 1,
};

export default MovieList;
