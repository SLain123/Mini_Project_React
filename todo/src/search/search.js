import React, { Component } from 'react';
import './search.css';

class Search extends Component {
    render() {
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
                    className="search-btn__imp search-btn">
                        Важные
                    </button>
                    <button
                    className="search-btn__done search-btn">
                        Завершенные
                    </button>
                </div>
            </div>
        )
    }
}

export default Search;