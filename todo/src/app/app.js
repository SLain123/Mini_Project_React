import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import Search from '../search/search';
import TodoList from '../todo-list/todo-list';
import AddItem from '../add/add';

import './app.css';

class App extends Component {
    state = {
        taskList: [ {taskName: 'Drink something', alarm: true, id: 1},
                    {taskName: 'Eat something', id: 2},
                    {taskName: 'Code something else', alarm: true, id: 3},
                    {taskName: 'Sleep a lot of sleep', id: 4} ]
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

    createItem = (taskName, id) => {
        this.setState(({taskList}) => {
            let arrCopy = [...taskList];
            arrCopy.push({
                taskName: taskName,
                id: id
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

    toggleDone = id => {
        this.setState(({taskList}) => {
            const idIndex = taskList.findIndex(el => el.id === id);
            const copyArr = [...taskList];
            const copyObj = {...copyArr[idIndex]};
            copyObj.done = !copyObj.done;
            copyArr[idIndex] = copyObj;

            return {
                taskList: copyArr
            }
        })
    }

    toggleAlarm = id => {
        this.setState(({taskList}) => {
            const idIndex = taskList.findIndex(el => el.id === id);
            const copyArr = [...taskList];
            const copyObj = {...copyArr[idIndex]};
            copyObj.alarm = !copyObj.alarm;
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
                toggleDone={this.toggleDone}
                toggleAlarm={this.toggleAlarm}/>
                <AddItem
                listLength={listLength}
                onCreate={this.createItem}/>
            </div>
        )
    }
}

export default App;