import React from 'react';

const Task = ({lable, timeToCreate}) => {
    return (
        <div className='view'>
            <input className='toggle' type='checkbox' />
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
