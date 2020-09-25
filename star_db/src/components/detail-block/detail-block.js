import React, {Component, Fragment} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import TestError from '../test-error/test-error';
import './detail-block.css';

class Details extends Component {
    render() {
        const {units, load, error, request, getImage, data} = this.props;
        let body = <DetailView 
            allParam={units} 
            request={request}
            getImage={getImage}
            data={data}/>

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
}

const DetailView = props => {

    const {name, id = 1} = props.allParam;
    const imgUrl = props.getImage(props.request, id);
    const keys = Object.keys(props.data);

    const list = keys.map(key => {
        const name = props.data[key];
        const item = props.allParam[key];
            return <li className="detail__info-details-item" key={name}>{name}: {item}</li>
        })

    return (
            <Fragment>
                <img 
                    className="detail__pic"
                    src={imgUrl}
                    alt="unit"
                    width="200"
                    height="230"/>
                <div className="detail__info-block">
                    <h1 className="detail__info-title">{name}</h1>
                    <ul className="detail__info-detals-list">
                        {list}
                    </ul>
                    <TestError/>
                </div>
            </Fragment>
    )
}

export default Details;