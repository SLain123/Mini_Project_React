import React, {Component} from 'react';
import LoadData from '../../services/load-data-service';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import './random-planet.css';

class RandomPlanet extends Component {
    allData = new LoadData();
    state = {
        planet: null,
        random: null,
        load: true,
        error: false,
        globalError: false
    }

    componentDidMount() {
        this.updatePlanet();
        setInterval(this.updatePlanet.bind(this), 5000);
    }

    componentDidCatch(error) {
        this.setState({
            globalError: true
        })
        console.log(error);
    }

    updatePlanet() {
        const random = (Math.floor(Math.random() * 25)) + 1;
        this.allData.getUnit('planets', random)
            .then(data => {
                this.setState({
                    planet: data,
                    load: false,
                    random: random
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
        const {load, error, planet, random, globalError} = this.state;

        let body = <RenderPlanet 
                        planet={planet} 
                        random={random}
                    />;
        if(load) {
            body = <Spinner/>
        } else if((!load && error) || globalError) {
            body = <ErrorMessage/>
        }

        return (
            <div className="random-planet random-planet_pos">
                {body}
            </div>
        )
    }
}

const RenderPlanet = ({planet, random}) => {
    const {name, population, rotationPeriod, diameter, orbitalPeriod, gravity, climate, terrain} = planet;
    let source = `https://starwars-visualguide.com/assets/img/planets/${random}.jpg`;
    
    if(random < 2 || random > 19) {
        source = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }

    return (
        <>
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
        </>
    )
}

export default RandomPlanet;