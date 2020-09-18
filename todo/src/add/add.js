import React, { Component } from 'react';
import './add.css';

class AddItem extends Component {

    render() {
        const {onCreate} = this.props;

        return (
            <div className="add add_pos">
                <input 
                    className="add__str"
                    type="text"
                    placeholder="Введите текст задачи для добавления"/>
                <button 
                className="add__btn"
                onClick={() => onCreate('kill')}>
                    Добавить
                </button>
            </div>
        )
    }
}

export default AddItem;