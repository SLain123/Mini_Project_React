import React, {Component} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import './item-list.css';

class ItemList extends Component {
    render() {
        const {people, load, error, clickOnPerson} = this.props;
        let body = <ItemListView people={people} clickOnPerson={clickOnPerson}/>;
        
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

    const list = props.people.map(people => {
        return createItem(people.id, people.name);
    });

    return list;
}

export default ItemList;