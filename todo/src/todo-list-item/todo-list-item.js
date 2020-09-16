import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './todo-list-item.css';

class TodoListItem extends Component {
    constructor({taskName, alarm = false}) {
        super()
        this.itemStyle = alarm ? 'todo-item__text todo-item_like' : 'todo-item__text';
        this.taskName = taskName;
    }
    render() {
        return (
            <div className="todo-item">
                <span className={this.itemStyle}>{this.taskName}</span>
                <div className="todo-item__icon-block">
                    <span className="todo-item__star todo-item__icon"><FontAwesomeIcon icon={faExclamation}/></span>
                    <span className="todo-item__bin todo-item__icon"><FontAwesomeIcon icon={faTrashAlt}/></span>
                </div>
            </div>
        )
    }
}

export default TodoListItem;