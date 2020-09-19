import React, { Component } from 'react';
import './search.css';

class Search extends Component {
state = {
    status: 'all'
}

    getInputValue = e => {
        const {getSearchPhrase} = this.props;
        getSearchPhrase(e.target.value);
    }

    getBtnStyle = btn => {
        let resultStyle = `search-btn`;
        if(this.state.status === btn) {
            resultStyle += ' search-btn_active';
        }
    
        return resultStyle;
    }

    changeStyle = btn => {
        this.setState(() => {
            return {
                status: btn
            }
        })
    }

    render() {
        const {hideAllOrUnhide, displayFilterTasks} = this.props;

        return (
            <div
            className="search search_pos">
                <input
                className="search__find-str"
                type="text"
                placeholder="Поиск по имени задачи"
                onChange={this.getInputValue}/>
                <div
                    className="search-btn__block">
                    <button
                    className={`search-btn__all ${this.getBtnStyle('all')}`}
                    onClick={() => {
                        hideAllOrUnhide(false);
                        this.changeStyle('all');
                        }}>
                        Все
                    </button>
                    <button
                    className={`search-btn__alarm ${this.getBtnStyle('alarm')}`}
                    onClick={() => {
                        displayFilterTasks('alarm');
                        this.changeStyle('alarm');
                        }}>
                        Важные
                    </button>
                    <button
                    className={`search-btn__done ${this.getBtnStyle('done')}`}
                    onClick={() => {
                        displayFilterTasks('done');
                        this.changeStyle('done');
                        }}>
                        Завершенные
                    </button>
                </div>
            </div>
        )
    }
}

export default Search;