import React from 'react';
import Task from '../task';

const TaskList = ({ tasks, changeRemoveTask }) => {
    const itemList = tasks.map((task) => {
        const { id, isDone } = task;
        const completedStyle = isDone ? 'completed' : null;

        return (
            <li className={completedStyle} key={id}>
                <Task {...task} changeRemoveTask={changeRemoveTask} />
            </li>
        );
    });

    return <ul className='todo-list'>{itemList}</ul>;
};

export default TaskList;
