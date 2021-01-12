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
                lable: 'Completed task',
                timeToCreate: formatDistanceToNow(new Date(2020, 6, 2), {
                    includeSeconds: true,
                    addSuffix: true,
                }),
                isDone: true,
            },
            {
                id: 2,
                lable: 'Editing task',
                timeToCreate: formatDistanceToNow(new Date(), {
                    includeSeconds: true,
                    addSuffix: true,
                }),
                isDone: false,
            },
            {
                id: 3,
                lable: 'Active task',
                timeToCreate: formatDistanceToNow(new Date()),
                isDone: false,
            },
        ],
    };

    render() {
        const tasks = this.state.tasks;
        return (
            <section className='todoapp'>
                <Header />
                <section className='main'>
                    <TaskList tasks={tasks} />
                </section>
                <Footer />
            </section>
        );
    }
}

export default App;
