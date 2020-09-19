import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './todo-list-item.css';

class TodoListItem extends Component {
    render() {
        const {taskName, onDelete, done, alarm, toggleParam, id, hide} = this.props;
        let textStyle = 'todo-item__text';
        let alarmBtnStyle = 'todo-item__alarm todo-item__icon';
        let itemStyle = 'todo-item';

        if (alarm) {
            textStyle += ' todo-item_alarm';
            alarmBtnStyle += ' todo-item_inactive';
        }

        if(done) {
            textStyle += ' todo-item_done';
        }

        if(hide) {
            itemStyle += ' todo-item_hide';
        }

        return (
            <div className={itemStyle}>
                <span 
                className={textStyle}
                onClick={() => toggleParam(id, 'done', 'toggle')}>
                    {taskName}
                </span>
                <div className="todo-item__icon-block">
                    <span 
                    className={alarmBtnStyle}
                    onClick={() => toggleParam(id, 'alarm', 'toggle')}>
                        <FontAwesomeIcon icon={faExclamation}/>
                    </span>
                    <span 
                    className="todo-item__bin todo-item__icon"
                    onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </span>
                </div>
            </div>
        )
    }
}

export default TodoListItem;