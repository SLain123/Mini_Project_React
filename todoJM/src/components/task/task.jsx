/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const getRightTimeFormat = (num) => {
  const result = num <= 9 ? `0${num}` : String(num);
  return result;
};

class Task extends Component {
  state = { runTimer: false };

  static propTypes = {
    id: PropTypes.number.isRequired,
    lable: PropTypes.string.isRequired,
    timeToCreate: PropTypes.instanceOf(Date).isRequired,
    isDone: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    changeRemoveTask: PropTypes.func.isRequired,
    addEditTask: PropTypes.func.isRequired,
    editingInput: PropTypes.string.isRequired,
    changeLable: PropTypes.func.isRequired,
    min: PropTypes.number,
    sec: PropTypes.number,
    changeTime: PropTypes.func.isRequired,
  };

  static defaultProps = {
    min: 0,
    sec: 0,
  };

  startTimer = () => {
    const { id, changeTime } = this.props;
    const { runTimer } = this.state;

    if (!runTimer) {
      const timer = setInterval(() => changeTime(id), 1000);
      localStorage.setItem(`timer${id}`, timer);

      this.setState({
        runTimer: true,
      });
    }
  };

  stopTimer = () => {
    const { id } = this.props;
    const timer = localStorage.getItem(`timer${id}`);

    clearInterval(timer);

    this.setState({
      runTimer: false,
    });
  };

  getTime = () => {
    const { min, sec } = this.props;
    return <span className="time">{`${getRightTimeFormat(min)}:${getRightTimeFormat(sec)}`}</span>;
  };

  render() {
    const {
      id,
      lable,
      timeToCreate,
      isDone,
      isEdit,
      changeRemoveTask,
      addEditTask,
      editingInput,
      changeLable,
    } = this.props;

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
            <span className="description description__timer-btn">
              <button aria-label="start timer" type="button" className="icon icon-play" onClick={this.startTimer} />
              <button aria-label="pause timer" type="button" className="icon icon-pause" onClick={this.stopTimer} />
            </span>
            {this.getTime()}
            <span className="description description_max-width">{`created ${formatDistanceToNow(
              new Date(timeToCreate),
              {
                addSuffix: true,
                includeSeconds: true,
              }
            )}`}</span>
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
            onClick={() => {
              this.stopTimer();
              changeRemoveTask(id, 'remove');
            }}
            type="button"
          />
        </div>
        {editInput}
      </>
    );
  }
}

export default Task;
