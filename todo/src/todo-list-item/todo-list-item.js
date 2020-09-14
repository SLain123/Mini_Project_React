import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './todo-list-item.css';

const TodoListItem = text => {
    const star = <FontAwesomeIcon icon={faStar}/>;
    const bin = <FontAwesomeIcon icon={faTrashAlt}/>;
    return (
        <div className="todo-item">
            <span className="todo-item__text">{text}</span>
            <div className="todo-item__icon-block">
                <span className="todo-item__star todo-item__icon">{star}</span>
                <span className="todo-item__bin todo-item__icon">{bin}</span>
            </div>
        </div>
    )
}

export default TodoListItem;