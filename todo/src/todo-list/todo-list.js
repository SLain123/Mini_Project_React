import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css'

const TodoList = () => {
    const task = TodoListItem('Drinkкуауууууууууууууууу ууууууууууууу ууууууууууууууу ууууууууууууууууууу уууууууууууууууууу ууууууеаукау кавае4у546ццц цццццццццццццццццццццццццццццццццццццццццццц');
    return (
        <div className="todo-list-block">
            {task}
            {task}
            {task}
        </div>
    )
}

export default TodoList;