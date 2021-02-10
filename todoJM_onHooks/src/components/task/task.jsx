import React, { useState, useEffect, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const getTime = (ms) => {
  let time = ms;
  const hours = Math.floor(time / 3600);
  time -= hours * 3600;

  const minutes = Math.floor(time / 60);
  time -= minutes * 60;

  const seconds = parseInt(time % 60, 10);

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

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
  controlTime,
  // changeControlTime,
}) => {
  const [timer, setTimer] = useState(null);
  const [spentTime, setSpentTime] = useState(controlTime);
  const [runTimer, setRunTimer] = useState(false);

  const startTimer = () => {
    if (!runTimer) {
      setRunTimer(true);

      const thisTimer = setInterval(() => setSpentTime((sec) => sec + 1), 1000);
      setTimer(thisTimer);
    }
  };

  const stopTimer = useCallback(() => {
    console.log('stop');
    clearInterval(timer);
    setRunTimer(false);
  }, [timer]);

  useEffect(
    () => () => {
      stopTimer();
      // changeControlTime(id, spentTime);
    },
    [stopTimer]
  );

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
          <span className="title">{lable}</span>
          <span className="description">
            <button aria-label="start timer" type="button" className="icon icon-play" onClick={startTimer} />
            <button aria-label="pause timer" type="button" className="icon icon-pause" onClick={stopTimer} />
            {getTime(spentTime)}
          </span>
          <span className="description">{`created ${formatDistanceToNow(new Date(timeToCreate), {
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
  controlTime: PropTypes.number,
  // changeControlTime: PropTypes.func.isRequired,
};

Task.defaultProps = {
  controlTime: 0,
};

export default Task;
