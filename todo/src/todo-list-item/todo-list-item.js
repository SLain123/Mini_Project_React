import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './todo-list-item.css';

class TodoListItem extends Component {
    state = {
        done: false,
        alarm: false
    };

    onAlarm = () => {
        this.setState((state) => {
            return {
                alarm: !state.alarm
            }
        })
    };

    onDone = () => {
        this.setState((state) => {
            return {
                done: !state.done
            }
        })
    }

    render() {
        const {taskName} = this.props;
        const {done, alarm} = this.state;
        let textStyle = 'todo-item__text';
        let alarmBtnStyle = 'todo-item__alarm todo-item__icon';

        if (alarm) {
            textStyle += ' todo-item_alarm';
            alarmBtnStyle += ' todo-item_inactive';
        }

        if(done) {
            textStyle += ' todo-item_done';
        }

        return (
            <div className="todo-item">
                <span 
                className={textStyle}
                onClick={this.onDone}>
                    {taskName}
                </span>
                <div className="todo-item__icon-block">
                    <span 
                    className={alarmBtnStyle}
                    onClick={this.onAlarm}>
                        <FontAwesomeIcon icon={faExclamation}/>
                    </span>
                    <span 
                    className="todo-item__bin todo-item__icon">
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </span>
                </div>
            </div>
        )
    }
}

export default TodoListItem;