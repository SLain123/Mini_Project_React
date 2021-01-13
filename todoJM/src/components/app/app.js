import React, { Component } from 'react';
import Header from '../header';
import TaskList from '../taskList';
import Footer from '../footer';
import { formatDistanceToNow } from 'date-fns';

class App extends Component {
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
    };

    changeTaskStatus = (id) => {
        const stateCopy = JSON.parse(JSON.stringify(this.state.tasks));
        const index = stateCopy.findIndex((task) => task.id === id);

        const currentTask = {
            ...stateCopy[index],
            isDone: !stateCopy[index].isDone,
        };
        const resultArr = [
            ...stateCopy.slice(0, index),
            currentTask,
            ...stateCopy.slice(index + 1),
        ];

        this.setState({
            tasks: resultArr,
        });
    };

    render() {
        const tasks = this.state.tasks;
        return (
            <section className='todoapp'>
                <Header />
                <section className='main'>
                    <TaskList
                        tasks={tasks}
                        changeDone={this.changeTaskStatus}
                    />
                </section>
                <Footer />
            </section>
        );
    }
}

export default App;
