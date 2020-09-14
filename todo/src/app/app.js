import React from 'react';
import AppHeader from '../app-header/app-header';
import Search from '../search/search';
import TodoList from '../todo-list/todo-list';
import Add from '../add/add';

import './app.css';

const App = () => {
    return (
        <div className="main">
            <AppHeader/>
            <Search/>
            <TodoList/>
            <Add/>
        </div>
    )
}

export default App;