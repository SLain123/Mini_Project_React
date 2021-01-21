import React from 'react';
import PropTypes from 'prop-types';

const Gender = ({ genderArr, id }) => (
    <div className='gender'>
        {genderArr.map((gender) => (
            <p key={`${id}-${gender}`} className='gender__text'>
                {gender}
            </p>
        ))}
    </div>
);

Gender.propTypes = {
    genderArr: PropTypes.arrayOf(PropTypes.number).isRequired,
    id: PropTypes.number.isRequired,
};

export default Gender;
