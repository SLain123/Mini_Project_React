import React, { Component } from 'react';
import './add.css';

class AddItem extends Component {
    state = {
        taskName: ''
    }

    getInputValue = e => {
        this.setState({
            taskName: e.target.value
        })
    }

    onSubmitForm = e => {
        e.preventDefault();
        const {onCreate} = this.props;
        if(this.state.taskName) {
            onCreate(this.state.taskName);
            this.setState({
                taskName: ''
            })
        }
    }

    render() {
        return (
            <form 
                className="add add_pos"
                onSubmit={this.onSubmitForm}>
                <input 
                    className="add__str"
                    type="text"
                    placeholder="Введите текст задачи для добавления"
                    onChange={this.getInputValue}
                    value={this.state.taskName}/>
                <button className="add__btn">
                    Добавить
                </button>
            </form>
        )
    }
}

export default AddItem;