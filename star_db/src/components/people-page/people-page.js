import React, { Component } from 'react';
import LoadData from '../../services/load-data-service';
import ItemList from '../item-list/item-list';
import Details from '../detail-block/detail-block';
import ErrorMessage from '../error-message/error-message';
import './people-page.css';

class PeoplePage extends Component {
    allData = new LoadData();
    state = {
        activeId: 1,
        people: [],
        person: {},
        load: true,
        error: false,
        globalError: false
    }

    componentDidMount() {
        this.getAllPeople();
        this.updatePerson();
    }

    componentDidUpdate(prevProp, prevState) {
        if(prevState.activeId !== this.state.activeId) {
            this.updatePerson()
        }
    }

    componentDidCatch(error) {
        this.setState({
            globalError: true
        })
        console.log(error);
    }

    getAllPeople() {
        return this.allData.getAllUnit('people')
        .then(data => {
            this.setState({
                people: data,
                load: false
            })
        })
        .catch(error => {
            this.setState({
                load: false,
                error: true
            })
            console.log(error);
        })
    }

    updatePerson() {
        this.allData.getUnit('people', this.state.activeId)
            .then(person => {
                this.setState({
                    person: person,
                    load: false
                })
            })
            .catch(error => {
                this.setState({
                    load: false,
                    error: true
                })
                console.log(error);
            })
    }

    clickOnPerson = id => {
        this.setState({
            activeId: id
        })
    }

    render() {
        const {person, people, load, error, globalError} = this.state;

        if(globalError) {
            return <ErrorMessage/>
        }

        return (
            <div className="people-page">
                <ItemList 
                    people={people}
                    load={load}
                    error={error}
                    clickOnPerson={this.clickOnPerson}/>
                <Details
                    person={person}
                    load={load}
                    error={error}/>
            </div>
        )
    }
}

export default PeoplePage;