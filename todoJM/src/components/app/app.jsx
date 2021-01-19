import React, { Component } from 'react';
import Header from '../header';
import TaskList from '../taskList';
import Footer from '../footer';

class App extends Component {
  genId = 1;

  state = {
    tasks: [
      this.createTaskPattern('Go shoping', true, new Date(2021, 0, 12)),
      this.createTaskPattern('Make app', false, new Date(2020, 11, 11)),
      this.createTaskPattern('Check tests', false, new Date(2020, 5, 1)),
    ],
    filter: 'all',
    editingInput: '',
  };

  getActiveTasksLength = () => {
    const { tasks } = this.state;
    return tasks.filter((task) => !task.isDone).length;
  };

  clearComplited = () => {
    this.setState(({ tasks }) => {
      const resultArr = tasks.filter((task) => (!task.isDone ? task : null));

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

  addEditTask = (newLable, id) => {
    if (newLable && !id) {
      this.setState(({ tasks }) => {
        const resultArr = [...tasks, this.createTaskPattern(newLable)];

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

  createTaskPattern(lable, isDone = false, timeToCreate = new Date()) {
    this.genId += 1;

    return {
      id: this.genId,
      lable,
      timeToCreate,
      isDone,
      isEdit: false,
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
          />
        </section>
        <Footer
          setFilter={this.setFilter}
          filter={filter}
          clearComplited={this.clearComplited}
          getActiveTasksLength={this.getActiveTasksLength}
        />
      </section>
    );
  }
}

export default App;
