import React from 'react';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import UnitPage from '../unit-page/unit-page';
import ErrorBoundy from '../error-boundy/error-boundy';
import TestError from '../test-error/test-error';

import './app.css';

const App = () => {

    const peopleStore = {
            gender: "Gender",
            height: "Height",
            mass: "Mass",
            birthYear: "Birth year",
            eyeColor: "Eye color",
            hairColor: "Hair color",
            skinColor: "Skin color"
        };

    const planetsStore = {
            population: "Population", 
            rotationPeriod: 'Rotation period', 
            diameter: 'Diameter', 
            orbitalPeriod: 'Orbital period', 
            gravity: 'Gravity', 
            climate: 'Climate',
            terrain: 'Terrain'
        };

    const starshipsStore = {
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
                                data={peopleStore}/>
                        </ErrorBoundy>
                        <ErrorBoundy>
                            <UnitPage 
                                request="planets"
                                data={planetsStore}/>
                        </ErrorBoundy>
                        <ErrorBoundy>
                            <UnitPage 
                                request="starships"
                                data={starshipsStore}/>
                        </ErrorBoundy>
                    </section>
                </div>
        </ErrorBoundy>
    )
}

export default App;