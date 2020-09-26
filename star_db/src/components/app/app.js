import React, {Component} from 'react';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import UnitPage from '../unit-page/unit-page';
import ErrorBoundy from '../error-boundy/error-boundy';
import TestError from '../test-error/test-error';

import './app.css';

class App extends Component {
    peopleStore = {
        gender: "Gender",
        height: "Height",
        mass: "Mass",
        birthYear: "Birth year",
        eyeColor: "Eye color",
        hairColor: "Hair color",
        skinColor: "Skin color"
    }

    planetsStore = {
        population: "Population", 
        rotationPeriod: 'Rotation period', 
        diameter: 'Diameter', 
        orbitalPeriod: 'Orbital period', 
        gravity: 'Gravity', 
        climate: 'Climate',
        terrain: 'Terrain'
    }

    starshipsStore = {
        model: 'Model',
        cargoCapacity:'Cargo capacity',
        consumables: 'Consumables',
        cost: 'Cost incredits',
        hyperDriveRating: 'Hyperdrive rating',
        length: 'Length',
        maxAtmospheringSpeed: 'Max atmosphering speed',
        passengers: 'Passengers',
        starshipClass: 'Starship class'
    }

    render() {
        return (
            <ErrorBoundy>
                <div className="main">
                    <Header/>
                    <ErrorBoundy>
                        <section className="top-part">
                            <RandomPlanet/>
                        </section>
                    </ErrorBoundy>
                    <TestError/>
                    <section className="bottom-part">
                        <ErrorBoundy>
                            <UnitPage 
                                request="people"
                                data={this.peopleStore}/>
                        </ErrorBoundy>
                        <ErrorBoundy>
                            <UnitPage 
                                request="planets"
                                data={this.planetsStore}/>
                        </ErrorBoundy>
                        <ErrorBoundy>
                            <UnitPage 
                                request="starships"
                                data={this.starshipsStore}/>
                        </ErrorBoundy>
                    </section>
                </div>
            </ErrorBoundy>
        )
    }
}

export default App;