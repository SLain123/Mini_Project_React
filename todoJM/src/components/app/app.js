import React, { Component } from 'react';
import Header from '../header';
import TaskList from '../taskList';
import Footer from '../footer';
import { formatDistanceToNow } from 'date-fns';

class App extends Component {
    genId = 10;

    state = {
        tasks: [
            {
                id: 1,
                lable: 'Go shoping',
                timeToCreate: formatDistanceToNow(new Date(2021, 0, 12), {
                    includeSeconds: true,
                    addSuffix: true,
                }),
                isDone: true,
            },
            {
                id: 2,
                lable: 'Make application',
                timeToCreate: formatDistanceToNow(new Date(2021, 0, 11), {
                    includeSeconds: true,
                    addSuffix: true,
                }),
                isDone: false,
            },
            {
                id: 3,
                lable: 'Check tests',
                timeToCreate: formatDistanceToNow(new Date(2020, 11, 10)),
                isDone: false,
            },
        ],
        filtedTasks: [],
        currentFilter: 'all',
        activeTask: 0,
    };

    changeRemoveTask = (id, act) => {
        const tasksCopy = JSON.parse(JSON.stringify(this.state.tasks));
        const index = tasksCopy.findIndex((task) => task.id === id);

        let resultArr;

        if (act === 'change') {
            const currentTask = {
                ...tasksCopy[index],
                isDone: !tasksCopy[index].isDone,
            };
            resultArr = [
                ...tasksCopy.slice(0, index),
                currentTask,
                ...tasksCopy.slice(index + 1),
            ];
        } else if (act === 'remove') {
            resultArr = [
                ...tasksCopy.slice(0, index),
                ...tasksCopy.slice(index + 1),
            ];
        }

        this.setState({
            tasks: resultArr,
        });
    };

    addTask = (lable) => {
        if (lable) {
            const newTask = {
                id: this.genId++,
                lable,
                timeToCreate: formatDistanceToNow(new Date()),
                isDone: false,
            };

            this.setState(({ tasks }) => {
                const resultArr = [...tasks, newTask];

                return {
                    tasks: resultArr,
                };
            });
        }
    };

    setFilter = (filter) => {
        this.setState(({ tasks }) => {
            if (filter === 'all') {
                return {
                    filtedTasks: tasks,
                    currentFilter: filter,
                };
            }

            const resultArr = tasks.filter((task) => {
                return task.isDone === filter ? task : null;
            });

            return {
                filtedTasks: resultArr,
                currentFilter: filter,
            };
        });
    };

    clearComplited = () => {
        const tasksCopy = JSON.parse(JSON.stringify(this.state.tasks));
        const resultArr = tasksCopy.filter((task) => {
            return !task.isDone ? task : null;
        });

        this.setState({
            tasks: resultArr,
        });
    };

    getActiveTask = () => {
        let result = 0;

        this.state.tasks.forEach((task) => {
            return !task.isDone ? result++ : null;
        });

        this.setState({
            activeTask: result,
        });
    };

    componentDidMount = () => {
        this.setFilter(this.state.currentFilter);
        this.getActiveTask();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.tasks !== prevState.tasks) {
            this.setFilter(this.state.currentFilter);
            this.getActiveTask();
        }
    };

    render() {
        const { filtedTasks, currentFilter, activeTask } = this.state;
        return (
            <section className='todoapp'>
                <Header addTask={this.addTask} />
                <section className='main'>
                    <TaskList
                        tasks={filtedTasks}
                        changeRemoveTask={this.changeRemoveTask}
                    />
                </section>
                <Footer
                    setFilter={this.setFilter}
                    currentFilter={currentFilter}
                    clearComplited={this.clearComplited}
                    activeTask={activeTask}
                />
            </section>
        );
    }
}

export default App;
