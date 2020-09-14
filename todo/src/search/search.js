import React from 'react';
import './search.css';

const Search = () => {
    return (
        <div
        className="search search_pos">
            <input
            className="search__find-str"
            type="text"
            placeholder="Поиск по имени задачи" />
            <div
                className="search-btn__block">
                <button
                className="search-btn__all search-btn">
                    Все
                </button>
                <button
                className="search-btn__like search-btn">
                    Понравилось
                </button>
            </div>
        </div>
    )
}

export default Search;