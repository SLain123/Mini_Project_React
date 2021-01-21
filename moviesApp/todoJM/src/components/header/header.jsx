import React from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../newTaskForm';

const Header = ({ addEditTask }) => (
  <header className="header">
    <h1>todos</h1>
    <NewTaskForm addEditTask={addEditTask} />
  </header>
);

Header.propTypes = {
  addEditTask: PropTypes.func.isRequired,
};

export default Header;
