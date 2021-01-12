import React from 'react';
import Task from '../task';

const TaskList = ({ tasks }) => {
    const itemList = tasks.map((task) => {
        const { id, isDone, ...taskInfo } = task;

        const completedStyle = isDone ? 'completed' : null;

        return (
            <li className={completedStyle} key={id}>
                <Task {...taskInfo} />
            </li>
        );
    });

    return <ul className='todo-list'>{itemList}</ul>;
};

export default TaskList;
