import React from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import TestError from '../test-error/test-error';
import './detail-block.css';

const Details = ({units, load, error, data, imageUrl}) => {
    let body = <RenderDetail 
        allParam={units} 
        imageUrl={imageUrl}
        data={data}
    />

    if(load) {
        body = <Spinner/>
    } else if(!load && error) {
        body = <ErrorMessage/>
    }
    
    return (
        <div className="detail detail_pos">
            {body}
        </div>
    )
}

const RenderDetail = ({allParam, data, imageUrl}) => {
    const keys = Object.keys(data);

    const list = keys.map(key => {
    const name = data[key];
    const item = allParam[key];
        return <li className="detail__info-details-item" key={name}>{name}: {item}</li>
    });

    return (
            <>
                <img 
                    className="detail__pic"
                    src={imageUrl}
                    alt="unit"
                    width="200"
                    height="230"/>
                <div className="detail__info-block">
                    <h1 className="detail__info-title">{allParam.name}</h1>
                    <ul className="detail__info-detals-list">
                        {list}
                    </ul>
                    <TestError/>
                </div>
            </>
    )
}

export default Details;