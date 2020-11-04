import React from 'react';
import {withRouter} from 'react-router-dom';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import PropTypes from 'prop-types';
import './item-list.css';

const ItemList = ({allUnits, load, error, history}) => {
    let body = <RenderListItem 
        allUnits={allUnits} 
        history={history}
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
    error: PropTypes.bool.isRequired
}

const RenderListItem = ({allUnits, history}) => {
    const createItem = (id, name) => {
        return <li onClick={() => {
            history.push(id)
        }}
            className="list__item" 
            key={id}>
                {name}
            </li>
    };

    const list = allUnits.map(unit => {
        return createItem(unit.id, unit.name);
    });

    return list;
}

export default withRouter(ItemList);