import React from 'react';
import TasksFilter from '../tasksFilter';

const Footer = ({ setFilter, currentFilter, clearComplited, activeTask }) => {
    return (
        <footer className='footer'>
            <span className='todo-count'>{activeTask} items left</span>
            <TasksFilter setFilter={setFilter} currentFilter={currentFilter} />
            <button className='clear-completed' onClick={clearComplited}>Clear completed</button>
        </footer>
    );
};

export default Footer;
