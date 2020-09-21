import React, {Component} from 'react';
import './random-planet.css';

class RandomPlanet extends Component {
    render() {
        return (
            <div className="random-planet random-planet_pos">
                <img 
                    className="random-planet__pic"
                    src="https://img1.goodfon.ru/original/640x480/6/61/art-deathcl0ck-kosmos-planeta.jpg"
                    alt="planet"
                    width="300"
                    height="300"/>
                <div className="random-planet__info-block">
                    <h1 className="random-planet__info-title">Planet</h1>
                    <ul className="random-planet__info-detals-list">
                        <li className="random-planet__info-details-item">population: 78577557</li>
                        <li className="random-planet__info-details-item">rotation: 3454646</li>
                        <li className="random-planet__info-details-item">diametr: 77757</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default RandomPlanet;