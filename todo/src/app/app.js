import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import Search from '../search/search';
import TodoList from '../todo-list/todo-list';
import AddItem from '../add/add';

import './app.css';

class App extends Component {
    state = {
        taskList: [ this.createItem('Drink something', 1),
                    this.createItem('Eat something', 2),
                    this.createItem('Code something else', 3),
                    this.createItem('Sleep a lot of sleep', 4)]
    }

    createItem(taskName, id) {
        return {
            taskName: taskName,
            alarm: false,
            id: id,
            done: false
        }
    }

    generateId = () => {
        if(!this.state.taskList[this.state.taskList.length - 1].id) {
            return 0;
        } else {
            return this.state.taskList[this.state.taskList.length - 1].id;
        }
    }

    deleteItem = id => {
        this.setState(({taskList}) => {
            const idIndex = taskList.findIndex(el => el.id === id);
            const newArr = [...taskList.slice(0, idIndex),
                            ...taskList.slice(idIndex + 1)];

            return {
                taskList: newArr
            }
        })
    }

    addItem = (taskName) => {
        this.setState(({taskList}) => {
            let arrCopy = [...taskList];
            let lastId = this.generateId();

            arrCopy.push({
                taskName: taskName,
                id: lastId + 1
            })

            return {
                taskList: arrCopy
            }
        })
    }

    countAlarm = () => {
        let result = 0;
        this.state.taskList.forEach(elem => {
            if(elem.alarm) {
                result++
            }
        })

        return result;
    }

    toggleParam = (id, param) => {
        this.setState(({taskList}) => {
            const idIndex = taskList.findIndex(el => el.id === id);
            const copyArr = [...taskList];
            const copyObj = {...copyArr[idIndex]};
            copyObj.[param] = !copyObj.[param];
            copyArr[idIndex] = copyObj;

            return {
                taskList: copyArr
            }
        })
    }


    render() {
        const listLength = this.state.taskList.length;
        const numOfAlarm = this.countAlarm();

        return (
            <div className="main">
                <AppHeader
                all={listLength}
                countAlarm={numOfAlarm}/>
                <Search/>
                <TodoList 
                taskList={this.state.taskList}
                onDelete={this.deleteItem}
                toggleParam={this.toggleParam}/>
                <AddItem
                listLength={listLength}
                onCreate={this.addItem}/>
            </div>
        )
    }
}

export default App;