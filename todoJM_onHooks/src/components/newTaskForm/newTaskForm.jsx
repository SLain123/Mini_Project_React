import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ addEditTask }) => {
  const [input, setInput] = useState('');

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={input}
      onChange={(evt) => {
        setInput(evt.target.value);
      }}
      onKeyDown={(evt) => {
        if (evt.key === 'Enter') {
          addEditTask(input);
          setInput('');
        }
      }}
    />
  );
};

NewTaskForm.propTypes = {
  addEditTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
