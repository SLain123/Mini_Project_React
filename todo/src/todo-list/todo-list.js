import React, {Component} from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css'

class TodoList extends Component {

    render() {
        const {taskList, onDelete, toggleParam} = this.props;
        return (
            <div className="todo-list-block">
                {taskList.map(item => {
                    const {id, ...tasks} = item;
                    return <TodoListItem 
                    {...tasks}
                    id={id}
                    key={id} 
                    onDelete={() => onDelete(id)}
                    transferParam={toggleParam}
                    />
                })}
            </div>
        )
    }
}

export default TodoList;