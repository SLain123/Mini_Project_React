/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Gender from '../gender';
import cutsOverview from '../../utils/cutsOverview';
import image from './ex.jpg';

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
        <div className='movie-item'>
            <img
                src={image}
                alt='movie logo'
                className='movie-item__img'
                path={imgPath}
            />
            <div className='movie-item__info'>
                <h2 className='movie-item__title'>{title}</h2>
                <p className='movie-item__data'>
                    {format(new Date(date), 'LLLL d, yyyy')}
                </p>
                <Gender genderArr={genderArr} id={id} />
                <p className='movie-item__overview'>
                    {cutsOverview(overview, 165)}
                </p>
            </div>
        </div>
    );
};

MovieItem.propTypes = {
    backdrop_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default MovieItem;
