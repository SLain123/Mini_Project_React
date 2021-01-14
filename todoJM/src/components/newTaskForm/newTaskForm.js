import React, { Component } from 'react';

class NewTaskForm extends Component {
    state = {
        input: '',
    };

    onChangeInput = (text) => {
        this.setState({
            input: text,
        });
    };

    render() {
        const { input } = this.state;
        const { addTask } = this.props;

        return (
            <input
                className='new-todo'
                placeholder='What needs to be done?'
                autoFocus
                value={input}
                onChange={(e) => {
                    this.onChangeInput(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTask(input);
                        this.onChangeInput('');
                    }
                }}
            />
        );
    }
}

export default NewTaskForm;
