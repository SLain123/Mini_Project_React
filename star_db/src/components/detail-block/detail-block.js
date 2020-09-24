import React, {Component, Fragment} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import './detail-block.css';

class Details extends Component {
    render() {
        const {person, load, error} = this.props;
        let body = <DetailView allParam={person}/>

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
    const {name, eyeColor, birthYear, gender, hairColor, height, mass, skinColor, id = 1} = props.allParam;
    
    return (
            <Fragment>
                <img 
                    className="detail__pic"
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                    alt="unit"
                    width="200"
                    height="230"/>
                <div className="detail__info-block">
                    <h1 className="detail__info-title">{name}</h1>
                    <ul className="detail__info-detals-list">
                        <li className="detail__info-details-item">Gender: {gender}</li>
                        <li className="detail__info-details-item">Height: {height}</li>
                        <li className="detail__info-details-item">Mass: {mass}</li>
                        <li className="detail__info-details-item">Birt year: {birthYear}</li>
                        <li className="detail__info-details-item">Eye color: {eyeColor}</li>
                        <li className="detail__info-details-item">Hair color: {hairColor}</li>
                        <li className="detail__info-details-item">Skin color: {skinColor}</li>
                    </ul>
                </div>
            </Fragment>
    )
}

export default Details;