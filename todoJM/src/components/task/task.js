import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

class Task extends Component {
    state = {
        lableInput: this.props.lable,
    };

    static propTypes = {
        id: PropTypes.number.isRequired,
        lable: PropTypes.string.isRequired,
        timeToCreate: PropTypes.instanceOf(Date).isRequired,
        isDone: PropTypes.bool.isRequired,
        isEdit: PropTypes.bool.isRequired,
        changeRemoveTask: PropTypes.func.isRequired,
        addEditTask: PropTypes.func.isRequired,
    }

    changeLable = (text) => {
        this.setState({
            lableInput: text,
        });
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
        } = this.props;

        const editInput = isEdit ? (
            <input
                type='text'
                className='edit'
                value={this.state.lableInput}
                onChange={(e) => this.changeLable(e.target.value)}
                onKeyDown={(e) =>
                    e.key === 'Enter'
                        ? addEditTask(this.state.lableInput, id)
                        : null
                }
            />
        ) : null;

        return (
            <>
                <div className='view'>
                    <input
                        className='toggle'
                        onClick={() => changeRemoveTask(id, 'change', 'isDone')}
                        type='checkbox'
                        defaultChecked={isDone}
                    />
                    <label>
                        <span className='description'>{lable}</span>
                        <span className='created'>{`created ${formatDistanceToNow(
                            new Date(timeToCreate),
                            { addSuffix: true, includeSeconds: true },
                        )}`}</span>
                    </label>
                    <button
                        className='icon icon-edit'
                        onClick={() => changeRemoveTask(id, 'change', 'isEdit')}
                    ></button>
                    <button
                        className='icon icon-destroy'
                        onClick={() => changeRemoveTask(id, 'remove')}
                    ></button>
                </div>
                {editInput}
            </>
        );
    }
}

export default Task;
