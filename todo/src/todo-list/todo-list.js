import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css'

const TodoList = ({taskList}) => {
    return (
        <div className="todo-list-block">
            {taskList.map(item => {
                const {id, ...tasks} = item;
                return <TodoListItem {...tasks} key={id}/>
            })}
        </div>
    )
}

export default TodoList;