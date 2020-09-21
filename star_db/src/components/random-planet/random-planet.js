import React, {Component} from 'react';
import LoadData from '../../services/load-data-service';
import './random-planet.css';

class RandomPlanet extends Component {
    constructor() {
        super()
        this._random = (Math.floor(Math.random() * 19)) + 1;
        this.updatePlanet();
    }

    allData = new LoadData();
    state = {}

    updatePlanet() {
        this.allData.getUnit('planets', this._random).then(data => {
            this.setState(data)
        })
    }

    render() {
        const {id = this._random, name, population, rotationPeriod, diameter, orbitalPeriod, gravity, climate, terrain} = this.state;
        return (
            <div className="random-planet random-planet_pos">
                <img 
                    className="random-planet__pic"
                    src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                    alt="planet"
                    width="300"
                    height="300"/>
                <div className="random-planet__info-block">
                    <h1 className="random-planet__info-title">{name}</h1>
                    <ul className="random-planet__info-detals-list">
                        <li className="random-planet__info-details-item">Population: {population}</li>
                        <li className="random-planet__info-details-item">Rotation Period: {rotationPeriod}</li>
                        <li className="random-planet__info-details-item">Diameter: {diameter}</li>
                        <li className="random-planet__info-details-item">Orbital Period: {orbitalPeriod}</li>
                        <li className="random-planet__info-details-item">Gravity: {gravity}</li>
                        <li className="random-planet__info-details-item">Climate: {climate}</li>
                        <li className="random-planet__info-details-item">Terrain: {terrain}</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default RandomPlanet;