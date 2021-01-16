import React from 'react';
import PropTypes from 'prop-types';

const TasksFilter = ({ setFilter, filter }) => {
    return (
        <ul className='filters'>
            <li>
                <button
                    className={filter === 'all' ? 'selected' : null}
                    onClick={() => {
                        setFilter('all');
                    }}
                >
                    All
                </button>
            </li>
            <li>
                <button
                    className={filter === false ? 'selected' : null}
                    onClick={() => {
                        setFilter(false);
                    }}
                >
                    Active
                </button>
            </li>
            <li>
                <button
                    className={filter === true ? 'selected' : null}
                    onClick={() => {
                        setFilter(true);
                    }}
                >
                    Completed
                </button>
            </li>
        </ul>
    );
};

TasksFilter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
};

export default TasksFilter;
