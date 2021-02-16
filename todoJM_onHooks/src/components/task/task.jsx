import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const getRightTimeFormat = (num) => {
  const result = num <= 9 ? `0${num}` : String(num);
  return result;
};

const Task = ({
  id,
  lable,
  timeToCreate,
  isDone,
  isEdit,
  changeRemoveTask,
  addEditTask,
  inputLable,
  setInputLable,
  changeTime,
  min,
  sec,
}) => {
  const [runTimer, setRunTimer] = useState(false);

  const startTimer = () => {
    if (!runTimer) {
      const timer = setInterval(() => changeTime(id), 1000);
      localStorage.setItem(`timer${id}`, timer);

      setRunTimer(true);
    }
  };

  const stopTimer = () => {
    const timer = localStorage.getItem(`timer${id}`);
    clearInterval(timer);

    setRunTimer(false);
  };

  const getTime = () => <span className="time">{`${getRightTimeFormat(min)}:${getRightTimeFormat(sec)}`}</span>;

  const editInput = isEdit ? (
    <input
      type="text"
      className="edit"
      value={inputLable}
      onChange={(evt) => setInputLable(evt.target.value)}
      onKeyDown={(evt) => (evt.key === 'Enter' ? addEditTask(inputLable, id) : null)}
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
          <span className="description description__timer-btn">
            <button aria-label="start timer" type="button" className="icon icon-play" onClick={startTimer} />
            <button aria-label="pause timer" type="button" className="icon icon-pause" onClick={stopTimer} />
          </span>
          {getTime()}
          <span className="description description_max-width">{`created ${formatDistanceToNow(new Date(timeToCreate), {
            addSuffix: true,
            includeSeconds: true,
          })}`}</span>
        </label>
        <button
          aria-label="change task lable"
          className="icon icon-edit"
          onClick={() => {
            changeRemoveTask(id, 'change', 'isEdit');
            setInputLable(lable);
          }}
          type="button"
        />
        <button
          aria-label="remove task"
          className="icon icon-destroy"
          onClick={() => {
            stopTimer();
            changeRemoveTask(id, 'remove');
          }}
          type="button"
        />
      </div>
      {editInput}
    </>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  lable: PropTypes.string.isRequired,
  timeToCreate: PropTypes.instanceOf(Date).isRequired,
  isDone: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  changeRemoveTask: PropTypes.func.isRequired,
  addEditTask: PropTypes.func.isRequired,
  inputLable: PropTypes.string.isRequired,
  setInputLable: PropTypes.func.isRequired,
  min: PropTypes.number,
  sec: PropTypes.number,
  changeTime: PropTypes.func.isRequired,
};

Task.defaultProps = {
  min: 0,
  sec: 0,
};

export default Task;
