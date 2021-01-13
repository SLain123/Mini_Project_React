import React from 'react';

const Task = ({ id, lable, timeToCreate, isDone, changeRemoveTask }) => {
    return (
        <div className='view'>
            <input
                className='toggle'
                onClick={() => changeRemoveTask(id, 'change')}
                type='checkbox'
                defaultChecked={isDone}
            />
            <label>
                <span className='description'>{lable}</span>
                <span className='created'>{`created ${timeToCreate}`}</span>
            </label>
            <button className='icon icon-edit'></button>
            <button
                className='icon icon-destroy'
                onClick={() => changeRemoveTask(id, 'remove')}
            ></button>
        </div>
    );
};

export default Task;
