import React, {Component} from 'react';
import LoadData from '../../services/load-data-service';
import './detail-block.css';

class Details extends Component {
    allData = new LoadData();
    state = {
        person: {},
    }

    componentDidMount() {
        this.updatePerson()
    }

    componentDidUpdate(prevProp) {
        if(prevProp.activeId !== this.props.activeId) {
            this.updatePerson()
        }
    }

    updatePerson() {
        this.allData.getUnit('people', this.props.activeId)
            .then(person => {
                this.setState({
                    person: person
                })
            })
    }

    render() {
        return (
            <DetailView
            allParam={this.state.person}/>
        )
    }
}

const DetailView = props => {
    const {name, eyeColor, birthYear, gender, hairColor, height, mass, skinColor, id = 1} = props.allParam;
    
    return (
        <div className="detail detail_pos">
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
            </div>
    )
}

export default Details;