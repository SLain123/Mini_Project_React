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
            done: false,
            hide: false
        }
    }

    hideAllOrUnhide = trueOrNot => {
        this.setState(({taskList}) => {
            const copyArr = JSON.parse(JSON.stringify(taskList));
            copyArr.map(obj => {
                obj.hide = trueOrNot;
                return obj;
            })

            return {
                taskList: copyArr
            }
        })
    }

    getSearchPhrase = (text) => {
        this.hideAllOrUnhide(true);
        const {taskList} = this.state;
        taskList.forEach(obj => {
            const {id} = obj;
            if(obj.taskName.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                this.toggleParam(id, 'hide', 'toggle');
            }
        })
    }

    displayFilterTasks = param => {
        const {taskList} = this.state;
        this.hideAllOrUnhide(false);

        taskList.forEach(obj => {
            const {id} = obj;
            if(obj.[param] === false) {
                this.toggleParam(id, 'hide');
            }
        })
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
                id: lastId + 1,
                alarm: false,
                done: false,
                hide: false
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

    toggleParam = (id, param, act) => {
        this.setState(({taskList}) => {
            const idIndex = taskList.findIndex(el => el.id === id);
            const copyArr = [...taskList];
            const copyObj = {...copyArr[idIndex]};
            if(act === 'toggle') {
                copyObj.[param] = !copyObj.[param];
            } else {
                copyObj.[param] = true;
            }
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
                <Search
                getSearchPhrase={this.getSearchPhrase}
                hideAllOrUnhide={this.hideAllOrUnhide}
                displayFilterTasks={this.displayFilterTasks}/>
                <TodoList 
                taskList={this.state.taskList}
                onDelete={this.deleteItem}
                toggleParam={this.toggleParam}/>
                <AddItem
                listLength={listLength}
                addItem={this.addItem}/>
            </div>
        )
    }
}

export default App;