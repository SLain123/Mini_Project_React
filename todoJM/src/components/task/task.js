import React from 'react';

const Task = ({id, lable, timeToCreate, isDone, changeDone }) => {
    return (
        <div className='view'>
            <input
                className='toggle'
                onClick={() => changeDone(id)}
                type='checkbox'
                defaultChecked={isDone}
            />
            <label>
                <span className='description'>{lable}</span>
                <span className='created'>{`created ${timeToCreate}`}</span>
            </label>
            <button className='icon icon-edit'></button>
            <button className='icon icon-destroy'></button>
        </div>
    );
};

export default Task;
