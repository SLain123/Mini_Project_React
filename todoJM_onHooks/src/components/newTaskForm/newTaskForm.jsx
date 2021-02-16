import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ addEditTask }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputMin, setInputMin] = useState(0);
  const [inputSec, setInputSec] = useState(0);

  const cleanForm = () => {
    setInputTitle('');
    setInputMin(0);
    setInputSec(0);
  };

  const addNewTask = (evt) => {
    if (evt.key === 'Enter' && inputTitle !== '' && inputTitle.match(/[\S]/) !== null) {
      const checkMin = inputMin > 1000 ? 999 : inputMin;
      const checkSec = inputSec > 59 ? 0 : inputSec;

      addEditTask(inputTitle, null, +checkMin, +checkSec);
      cleanForm();
    }
  };

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
          setInputTitle(evt.target.value);
        }}
        onKeyDown={(evt) => {
          addNewTask(evt);
        }}
      />
      <label htmlFor="min">minutes</label>
      <input
        className="task-form__min"
        placeholder="Min"
        type="number"
        id="min"
        value={inputMin}
        onChange={(evt) => {
          setInputMin(evt.target.value);
        }}
        onKeyDown={(evt) => {
          addNewTask(evt);
        }}
      />
      <label htmlFor="sec">seconds</label>
      <input
        className="task-form__sec"
        placeholder="Sec"
        type="number"
        id="sec"
        value={inputSec}
        onChange={(evt) => {
          setInputSec(evt.target.value);
        }}
        onKeyDown={(evt) => addNewTask(evt)}
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  addEditTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
