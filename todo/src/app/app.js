import React from 'react';
import AppHeader from '../app-header/app-header';
import Search from '../search/search';
import TodoList from '../todo-list/todo-list';
import Add from '../add/add';

import './app.css';

const App = () => {
    const taskList = [{taskName: 'Drink something', alarm: true, id: 1},
                    {taskName: 'Eat something', id: 2},
                    {taskName: 'Code something else', alarm: true, id: 3},
                    {taskName: 'Sleep a lot of sleep', id: 4}];
    return (
        <div className="main">
            <AppHeader/>
            <Search/>
            <TodoList taskList={taskList}/>
            <Add/>
        </div>
    )
}

export default App;