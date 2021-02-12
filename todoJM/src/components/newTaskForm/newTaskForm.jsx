/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTaskForm extends Component {
  state = {
    inputTitle: '',
    inputMin: 0,
    inputSec: 0,
  };

  static propTypes = {
    addEditTask: PropTypes.func.isRequired,
  };

  onChangeInput = (inputName, text) => {
    this.setState({
      [inputName]: text,
    });
  };

  cleanForm = () => {
    this.setState({
      inputTitle: '',
      inputMin: 0,
      inputSec: 0,
    });
  };

  addNewTask = (evt) => {
    const { inputTitle, inputMin, inputSec } = this.state;
    const { addEditTask } = this.props;

    if (evt.key === 'Enter' && inputTitle !== '' && inputTitle.match(/[\S]/) !== null) {
      const checkMin = inputMin > 1000 ? 999 : inputMin;
      const checkSec = inputSec > 59 ? 0 : inputSec;

      addEditTask(inputTitle, null, +checkMin, +checkSec);
      this.cleanForm();
    }
  };

  render() {
    const { inputTitle, inputMin, inputSec } = this.state;

    return (
      <form className="task-form">
        <label htmlFor="title">Title</label>
        <input
          className="task-form__title"
          placeholder="What needs to be done?"
          type="input"
          required
          id="title"
          value={inputTitle}
          onChange={(evt) => {
            this.onChangeInput('inputTitle', evt.target.value);
          }}
          onKeyDown={(evt) => this.addNewTask(evt)}
        />
        <label htmlFor="min">minutes</label>
        <input
          className="task-form__min"
          placeholder="Min"
          type="number"
          id="min"
          value={inputMin}
          onChange={(evt) => {
            this.onChangeInput('inputMin', evt.target.value);
          }}
          onKeyDown={(evt) => this.addNewTask(evt)}
        />
        <label htmlFor="sec">seconds</label>
        <input
          className="task-form__sec"
          placeholder="Sec"
          type="number"
          id="sec"
          value={inputSec}
          onChange={(evt) => {
            this.onChangeInput('inputSec', evt.target.value);
          }}
          onKeyDown={(evt) => this.addNewTask(evt)}
        />
      </form>
    );
  }
}

export default NewTaskForm;
