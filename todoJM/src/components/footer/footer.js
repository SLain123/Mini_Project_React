import React from 'react';
import TasksFilter from '../tasksFilter';
import PropTypes from 'prop-types';

const Footer = ({
    setFilter,
    filter,
    clearComplited,
    getActiveTasksLength,
}) => {
    return (
        <footer className='footer'>
            <span className='todo-count'>{getActiveTasksLength()} items left</span>
            <TasksFilter setFilter={setFilter} filter={filter} />
            <button className='clear-completed' onClick={clearComplited}>
                Clear completed
            </button>
        </footer>
    );
};

Footer.propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    clearComplited: PropTypes.func.isRequired,
    getActiveTasksLength: PropTypes.func.isRequired,
};

Footer.defaultProps = {
    filter: 'all',
};

export default Footer;
