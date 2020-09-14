import React from 'react';
import './add.css';

const Add = () => {
    return (
        <div className="add add_pos">
            <input 
                className="add__str"
                type="text"
                placeholder="Введите текст задачи для добавления в список"/>
            <button className="add__btn">Добавить</button>
        </div>
    )
}

export default Add;