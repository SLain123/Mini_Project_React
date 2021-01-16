import React from 'react';
import NewTaskForm from '../newTaskForm';
import PropTypes from 'prop-types';

const Header = ({ addEditTask }) => {
    return (
        <header className='header'>
            <h1>todos</h1>
            <NewTaskForm addEditTask={addEditTask} />
        </header>
    );
};

Header.propTypes = {
    addEditTask: PropTypes.func.isRequired,
};

export default Header;
