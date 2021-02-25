import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchWord, changeSearchWord, workMode }) => {
    const content =
        workMode === 'Search' ? (
            <input
                className='search'
                type='input'
                placeholder='Type to search...'
                value={searchWord}
                onChange={(evt) => changeSearchWord(evt.target.value)}
            />
        ) : null;
    return content;
};

Search.propTypes = {
    searchWord: PropTypes.string.isRequired,
    changeSearchWord: PropTypes.func.isRequired,
    workMode: PropTypes.string.isRequired,
};

export default Search;
