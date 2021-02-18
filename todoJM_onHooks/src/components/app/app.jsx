import React, { useState, useCallback } from 'react';
import { uniqueId } from 'lodash';
import Header from '../header';
import TaskList from '../taskList';
import Footer from '../footer';

const App = () => {
  const createTaskPattern = (id, lable, min = 0, sec = 0, isDone = false, timeToCreate = new Date()) => {
    const task = {
      id,
      lable,
      timeToCreate,
      isDone,
      isEdit: false,
      min,
      sec,
    };

    return task;
  };

  const [tasks, setTasks] = useState([
    createTaskPattern('s1', 'Go shoping', 1, 20, true, new Date(2021, 0, 12)),
    createTaskPattern('s2', 'Make app', 12, 50, false, new Date(2020, 11, 11)),
    createTaskPattern('s3', 'Check tests'),
  ]);
  const [filter, setFilter] = useState('all');
  const [inputLable, setInputLable] = useState('');

  const clearComplited = () => {
    const resultArr = [];
    tasks.forEach((task) => {
      const { id, isDone } = task;
      if (isDone) {
        const timer = localStorage.getItem(`timer${id}`);
        clearInterval(timer);
      } else resultArr.push(task);
    });

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

  const addEditTask = (newLable, id, min, sec) => {
    if (newLable && !id) {
      const resultArr = [...tasks, createTaskPattern(uniqueId('n'), newLable, min, sec)];

      setTasks(resultArr);
    } else if (newLable && id) {
      const index = tasks.findIndex((task) => task.id === id);

      const currentTask = {
        ...tasks[index],
        lable: newLable,
        isEdit: false,
      };
      const resultArr = [...tasks.slice(0, index), currentTask, ...tasks.slice(index + 1)];

      setTasks(resultArr);
    }
  };

  const changeTime = useCallback((id, min, sec) => {
    setTasks((oldTasks) => {
      const index = oldTasks.findIndex((task) => task.id === id);

      if (oldTasks[index]) {
        const currentTask = {
          ...oldTasks[index],
          min,
          sec,
        };

        const resultArr = [...oldTasks.slice(0, index), currentTask, ...oldTasks.slice(index + 1)];

        return resultArr;
      }
      return oldTasks;
    });
  }, []);

  return (
    <section className="todoapp">
      <Header addEditTask={addEditTask} />
      <section className="main">
        <TaskList
          tasks={tasks}
          filter={filter}
          setInputLable={setInputLable}
          changeRemoveTask={changeRemoveTask}
          addEditTask={addEditTask}
          inputLable={inputLable}
          changeTime={changeTime}
        />
      </section>
      <Footer
        setFilter={setFilter}
        filter={filter}
        clearComplited={clearComplited}
        activeTasksLength={tasks.filter((task) => !task.isDone).length}
      />
    </section>
  );
};

export default App;
