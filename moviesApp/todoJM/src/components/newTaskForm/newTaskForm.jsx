import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTaskForm extends Component {
  state = {
    input: '',
  };

  static propTypes = {
    addEditTask: PropTypes.func.isRequired,
  };

  onChangeInput = (text) => {
    this.setState({
      input: text,
    });
  };

  render() {
    const { input } = this.state;
    const { addEditTask } = this.props;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={input}
        onChange={(evt) => {
          this.onChangeInput(evt.target.value);
        }}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            addEditTask(input);
            this.onChangeInput('');
          }
        }}
      />
    );
  }
}

export default NewTaskForm;
