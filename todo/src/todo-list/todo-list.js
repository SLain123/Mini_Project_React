import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css'

const TodoList = ({taskList, onDelete, toggleDone, toggleAlarm}) => {
    return (
        <div className="todo-list-block">
            {taskList.map(item => {
                const {id, ...tasks} = item;
                return <TodoListItem 
                {...tasks} 
                key={id} 
                onDelete={() => onDelete(id)}
                toggleDone={() => toggleDone(id)}
                toggleAlarm={() => toggleAlarm(id)}
                />
            })}
        </div>
    )
}

export default TodoList;