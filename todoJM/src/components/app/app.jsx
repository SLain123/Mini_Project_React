import React, { Component } from 'react';
import Header from '../header';
import TaskList from '../taskList';
import Footer from '../footer';

class App extends Component {
  genId = 0;

  state = {
    tasks: [
      this.createTaskPattern('Go shoping', 1, 20, true, new Date(2021, 0, 12)),
      this.createTaskPattern('Make app', 12, 50, false, new Date(2020, 11, 11)),
      this.createTaskPattern('Check tests'),
    ],
    filter: 'all',
    editingInput: '',
  };

  clearComplited = () => {
    this.setState(({ tasks }) => {
      const resultArr = [];
      tasks.forEach((task) => {
        const { id, isDone } = task;
        if (isDone) {
          const timer = localStorage.getItem(`timer${id}`);
          clearInterval(timer);
        } else resultArr.push(task);
      });

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

  changeTime = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id);
      const { min, sec } = tasks[index];

      if (min === 0 && sec === 0) {
        return null;
      }

      let newSec;
      let newMin;

      if (sec === 0) {
        newMin = min - 1;
        newSec = 59;
      } else {
        newMin = min;
        newSec = sec - 1;
      }

      const currentTask = {
        ...tasks[index],
        min: newMin,
        sec: newSec,
      };

      const resultArr = [...tasks.slice(0, index), currentTask, ...tasks.slice(index + 1)];

      return {
        tasks: resultArr,
      };
    });
  };

  createTaskPattern(lable, min = 0, sec = 0, isDone = false, timeToCreate = new Date()) {
    this.genId += 1;

    return {
      id: this.genId,
      lable,
      timeToCreate,
      isDone,
      isEdit: false,
      min,
      sec,
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
            changeTime={this.changeTime}
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
