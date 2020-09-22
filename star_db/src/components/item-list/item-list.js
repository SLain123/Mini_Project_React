import React, {Component} from 'react';
import './item-list.css';

class ItemList extends Component {
    state = {
        people: null
    }

    render() {
        return (
            <ul className="list list_pos">
                <li className="list__item">Luck 75575786889</li>
                <li className="list__item">Luck 75575786889</li>
                <li className="list__item">Luck 75575786889</li>
                <li className="list__item">Luck 75575786889</li>
                <li className="list__item">Luck 75575786889</li>
            </ul>
        )
    }
}

export default ItemList;