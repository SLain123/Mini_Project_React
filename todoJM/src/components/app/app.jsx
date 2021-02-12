import React, { Component } from 'react';
import Header from '../header';
import TaskList from '../taskList';
import Footer from '../footer';

class App extends Component {
  genId = 0;

  state = {
    tasks: [
      this.createTaskPattern('Go shoping', 10, 0, false, true, new Date(2021, 0, 12)),
      this.createTaskPattern('Make app', 12, 50, false, false, new Date(2020, 11, 11)),
      this.createTaskPattern('Check tests'),
    ],
    filter: 'all',
    editingInput: '',
  };

  clearComplited = () => {
    this.setState(({ tasks }) => {
      const resultArr = tasks.filter((task) => !task.isDone && task);

      return { tasks: resultArr };
    });
  };

  setFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  changeRemoveTask = (id, act, prop) => {
    this.setState(({ tasks }) => {
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

      return { tasks: resultArr };
    });
  };

  addEditTask = (newLable, id, min, sec) => {
    if (newLable && !id) {
      this.setState(({ tasks }) => {
        const resultArr = [...tasks, this.createTaskPattern(newLable, min, sec)];

        return {
          tasks: resultArr,
        };
      });
    } else if (newLable && id) {
      this.setState(({ tasks }) => {
        const index = tasks.findIndex((task) => task.id === id);

        const currentTask = {
          ...tasks[index],
          lable: newLable,
          isEdit: false,
        };
        const resultArr = [...tasks.slice(0, index), currentTask, ...tasks.slice(index + 1)];

        return {
          tasks: resultArr,
        };
      });
    }
  };

  changeLable = (text) => {
    this.setState({
      editingInput: text,
    });
  };

  changeControlTime = (id, controlTime) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);

      if (tasks[index]) {
        const currentTask = {
          ...tasks[index],
          controlTime,
        };
        const resultArr = [...tasks.slice(0, index), currentTask, ...tasks.slice(index + 1)];

        return {
          tasks: resultArr,
        };
      }
      return null;
    });
  };

  createTaskPattern(lable, min = 0, sec = 0, runTimer = false, isDone = false, timeToCreate = new Date()) {
    this.genId += 1;

    return {
      id: this.genId,
      lable,
      timeToCreate,
      isDone,
      isEdit: false,
      controlTime: 0,
      min,
      sec,
      runTimer,
    };
  }

  render() {
    const { tasks, filter, editingInput } = this.state;

    return (
      <section className="todoapp">
        <Header addEditTask={this.addEditTask} />
        <section className="main">
          <TaskList
            tasks={tasks}
            filter={filter}
            editingInput={editingInput}
            changeRemoveTask={this.changeRemoveTask}
            addEditTask={this.addEditTask}
            changeLable={this.changeLable}
            changeControlTime={this.changeControlTime}
          />
        </section>
        <Footer
          setFilter={this.setFilter}
          filter={filter}
          clearComplited={this.clearComplited}
          activeTasksLength={tasks.filter((task) => !task.isDone).length}
        />
      </section>
    );
  }
}

export default App;
