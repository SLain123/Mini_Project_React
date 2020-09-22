import React, {Component, Fragment} from 'react';
import LoadData from '../../services/load-data-service';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import './random-planet.css';

class RandomPlanet extends Component {
    constructor() {
        super()
        this.updatePlanet();
    }

    allData = new LoadData();
    state = {
        planet: {},
        random: (Math.floor(Math.random() * 25)) + 1,
        load: true,
        error: false
    }

    updatePlanet() {
        const {random} = this.state;
        this.allData.getUnit('planets', random)
            .then(data => {
                this.setState({
                    planet: data,
                    load: false
                })
            })
            .catch(error => {
                this.setState({
                    load: false,
                    error: true
                })
                console.log(error);
            })
    }

    render() {
        const {load, error, planet, random} = this.state;

        let body = <RandomPlanetView planet={planet} random={random}/>;
        if(load) {
            body = <Spinner/>
        } else if(!load && error) {
            body = <ErrorMessage/>
        }

        return (
            <div className="random-planet random-planet_pos">
                {body}
            </div>
        )
    }
}

const RandomPlanetView = (props) => {
    const {name, population, rotationPeriod, diameter, orbitalPeriod, gravity, climate, terrain} = props.planet;
    const random = props.random;

    let source = `https://starwars-visualguide.com/assets/img/planets/${random}.jpg`;
    if(random < 2 || random > 19) {
        source = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }
    
    return (
        <Fragment>
                <img 
                    className="random-planet__pic"
                    src={source}
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
        </Fragment>
    )
}

export default RandomPlanet;