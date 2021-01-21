import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Task = ({
  id,
  lable,
  timeToCreate,
  isDone,
  isEdit,
  changeRemoveTask,
  addEditTask,
  editingInput,
  changeLable,
}) => {
  const editInput = isEdit ? (
    <input
      type="text"
      className="edit"
      value={editingInput}
      onChange={(evt) => changeLable(evt.target.value)}
      onKeyDown={(evt) => (evt.key === 'Enter' ? addEditTask(editingInput, id) : null)}
    />
  ) : null;

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          onClick={() => changeRemoveTask(id, 'change', 'isDone')}
          type="checkbox"
          defaultChecked={isDone}
        />
        <label>
          <span className="description">{lable}</span>
          <span className="created">{`created ${formatDistanceToNow(new Date(timeToCreate), {
            addSuffix: true,
            includeSeconds: true,
          })}`}</span>
        </label>
        <button
          aria-label="change task lable"
          className="icon icon-edit"
          onClick={() => {
            changeRemoveTask(id, 'change', 'isEdit');
            changeLable(lable);
          }}
          type="button"
        />
        <button
          aria-label="remove task"
          className="icon icon-destroy"
          onClick={() => changeRemoveTask(id, 'remove')}
          type="button"
        />
      </div>
      {editInput}
    </>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  lable: PropTypes.string.isRequired,
  timeToCreate: PropTypes.instanceOf(Date).isRequired,
  isDone: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  changeRemoveTask: PropTypes.func.isRequired,
  addEditTask: PropTypes.func.isRequired,
  editingInput: PropTypes.string.isRequired,
  changeLable: PropTypes.func.isRequired,
};

export default Task;
