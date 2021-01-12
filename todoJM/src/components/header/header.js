import React from 'react';
import NewTaskForm from '../newTaskForm';

const Header = () => {
    return (
        <header className='header'>
            <h1>todos</h1>
            <NewTaskForm />
        </header>
    );
};

export default Header;
