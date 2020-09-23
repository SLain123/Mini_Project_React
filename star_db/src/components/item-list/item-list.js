import React, {Component} from 'react';
import LoadData from '../../services/load-data-service';
import './item-list.css';

class ItemList extends Component {
    allData = new LoadData();
    state = {
        people: []
    }

    componentDidMount() {
        this.getAllPeople();
    }

    getAllPeople() {
        return this.allData.getAllUnit('people')
        .then(data => {
            this.setState({
                people: data
            })
        })
    }

    render() {
        return (
            <ItemListView
                peopleList={this.state.people}
                clickOnPerson={this.props.clickOnPerson}/>
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
    }

    return (
        <ul className="list list_pos">
            {props.peopleList.map(people => {
                return createItem(people.id, people.name);
            })}
        </ul>
    )
}

export default ItemList;