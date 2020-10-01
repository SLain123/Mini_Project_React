import React from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import PropTypes from 'prop-types';
import './item-list.css';

const ItemList = ({allUnits, load, error, clickOnPerson}) => {
    let body = <RenderListItem 
        allUnits={allUnits} 
        clickOnPerson={clickOnPerson}
        />;
    
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

ItemList.propTypes = {
    allUnits: PropTypes.array.isRequired,
    load: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    clickOnPerson: PropTypes.func.isRequired
}

const RenderListItem = ({clickOnPerson, allUnits}) => {
    const createItem = (id, name) => {
        return <li 
            className="list__item" 
            key={id}
            onClick={() => {
                clickOnPerson(id)
            }}>
                {name}
            </li>
    };

    const list = allUnits.map(unit => {
        return createItem(unit.id, unit.name);
    });

    return list;
}

export default ItemList;