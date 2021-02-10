/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import Header from '../header';
import TaskList from '../taskList';
import Footer from '../footer';

const createTaskPattern = (lable, id, isDone = false, timeToCreate = new Date()) => {
  const task = {
    id,
    lable,
    timeToCreate,
    isDone,
    isEdit: false,
    controlTime: 0,
  };
  return task;
};

const App = () => {
  const [genId, setGenId] = useState(4);
  const [tasks, setTasks] = useState([
    createTaskPattern('Go shoping', 1, true, new Date(2021, 0, 12)),
    createTaskPattern('Make app', 2, false, new Date(2020, 11, 11)),
    createTaskPattern('Check tests', 3, false, new Date(2020, 5, 1)),
  ]);

  const [filter, setFilter] = useState('all');
  const [editingInput, setEditingInput] = useState('');

  const getActiveTasksLength = () => tasks.filter((task) => !task.isDone).length;

  const clearComplited = () => {
    const resultArr = tasks.filter((task) => !task.isDone && task);
    setTasks(resultArr);
  };

  const changeRemoveTask = (id, act, prop) => {
    const index = tasks.findIndex((task) => task.id === id);
    let resultArr;

    if (act === 'change') {
      const currentTask = {
        ...tasks[index],
        [prop]: !tasks[index][prop],
      };
      resultArr = [...tasks.slice(0, index), currentTask, ...tasks.slice(index + 1)];
    } else if (act === 'remove') {
      resultArr = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    }

    setTasks(resultArr);
  };

  const addEditTask = (newLable, id) => {
    let resultArr;

    if (newLable && !id) {
      resultArr = [...tasks, createTaskPattern(newLable, genId)];
      setGenId(genId + 1);
    } else if (newLable && id) {
      const index = tasks.findIndex((task) => task.id === id);
      const currentTask = {
        ...tasks[index],
        lable: newLable,
        isEdit: false,
      };
      resultArr = [...tasks.slice(0, index), currentTask, ...tasks.slice(index + 1)];
    }

    setTasks(resultArr);
  };

  const changeLable = (text) => {
    setEditingInput(text);
  };

  const changeControlTime = (id, controlTime) => {
    const index = tasks.findIndex((task) => task.id === id);
    let resultArr = tasks;

    if (tasks[index]) {
      const currentTask = {
        ...tasks[index],
        controlTime,
      };
      resultArr = [...tasks.slice(0, index), currentTask, ...tasks.slice(index + 1)];
    }
    setTasks(resultArr);
  };

  return (
    <section className="todoapp">
      <Header addEditTask={addEditTask} />
      <section className="main">
        <TaskList
          tasks={tasks}
          filter={filter}
          editingInput={editingInput}
          changeRemoveTask={changeRemoveTask}
          addEditTask={addEditTask}
          changeLable={changeLable}
          changeControlTime={changeControlTime}
        />
      </section>
      <Footer
        setFilter={setFilter}
        filter={filter}
        clearComplited={clearComplited}
        getActiveTasksLength={getActiveTasksLength}
      />
    </section>
  );
};

export default App;
