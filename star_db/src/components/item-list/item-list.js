import React, {Component, Fragment} from 'react';
import LoadData from '../../services/load-data-service';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import './item-list.css';

class ItemList extends Component {
    allData = new LoadData();
    state = {
        people: [],
        load: true,
        error: false
    }

    componentDidMount() {
        this.getAllPeople();
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

    render() {
        const {load, error} = this.state;
        let body = <ItemListView peopleList={this.state.people} clickOnPerson={this.props.clickOnPerson}/>;
        if(load) {
            body = <Spinner/>
        } else if(!load && error) {
            body = <ErrorMessage/>
        }

        return (
            <ul className="list list_pos">
                {body}
            </ul>
        )
    }
}

const ItemListView = props => {
    const createItem = (id, name) => {
        return <li 
            className="list__item" 
            key={id}
            onClick={() => {
                props.clickOnPerson(id)
            }}>
                {name}
            </li>
    };

    const list = props.peopleList.map(people => {
        return createItem(people.id, people.name);
    });

    return list;
}

export default ItemList;