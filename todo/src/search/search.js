import React, { Component } from 'react';
import './search.css';

class Search extends Component {
state = {
    all: true,
    alarm: false,
    done: false
}

    getInputValue = e => {
        const {getSearchPhrase} = this.props;
        getSearchPhrase(e.target.value);
    }

    getBtnStyle = (style, activeBtn) => {
        let resultStyle = `search-btn ${style}`;
        if(activeBtn) {
            resultStyle += ' search-btn_active';
        }

        return resultStyle;
    }

    chahgeStyleToFalse = () => {
        this.setState(() => {
            return {
                all: false,
                alarm: false,
                done: false
            }
        })
    }

    changeStyle = btn => {
        this.chahgeStyleToFalse()
        this.setState(() => {
            return {
                [btn]: true
            }
        })
    }

    render() {
        const {hideAllOrUnhide, displayFilterTasks} = this.props;
        const allBtnStyle = this.getBtnStyle('search-btn__all', this.state.all);
        const alarmBtnStyle = this.getBtnStyle('search-btn__alarm', this.state.alarm);
        const doneBtnStyle = this.getBtnStyle('search-btn__done', this.state.done);

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
                    className={allBtnStyle}
                    onClick={() => {
                        hideAllOrUnhide(false);
                        this.changeStyle('all');
                        }}>
                        Все
                    </button>
                    <button
                    className={alarmBtnStyle}
                    onClick={() => {
                        displayFilterTasks('alarm');
                        this.changeStyle('alarm');
                        }}>
                        Важные
                    </button>
                    <button
                    className={doneBtnStyle}
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