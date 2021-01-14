import React, { Component } from 'react';

class TasksFilter extends Component {
    render() {
        const { setFilter, currentFilter } = this.props;

        return (
            <ul className='filters'>
                <li>
                    <button
                        className={currentFilter === 'all' ? 'selected' : null}
                        onClick={() => {
                            setFilter('all');
                        }}
                    >
                        All
                    </button>
                </li>
                <li>
                    <button
                        className={currentFilter === false ? 'selected' : null}
                        onClick={() => {
                            setFilter(false);
                        }}
                    >
                        Active
                    </button>
                </li>
                <li>
                    <button
                        className={currentFilter === true ? 'selected' : null}
                        onClick={() => {
                            setFilter(true);
                        }}
                    >
                        Completed
                    </button>
                </li>
            </ul>
        );
    }
}

export default TasksFilter;
