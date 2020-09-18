import React, { Component } from 'react';
import './add.css';

class AddItem extends Component {
    state = {
        count: this.props.listLength + 1
    }

    plusCount = () => {
        this.setState(({count}) => {
            return {
                count: ++count
            }
        })
    }

    render() {
        const {onCreate} = this.props;
        const {count} = this.state;
        return (
            <div className="add add_pos">
                <input 
                    className="add__str"
                    type="text"
                    placeholder="Введите текст задачи для добавления"/>
                <button 
                className="add__btn"
                onClick={() => {
                    onCreate('kill him', count)
                    this.plusCount()
                }}>
                    Добавить
                </button>
            </div>
        )
    }
}

export default AddItem;