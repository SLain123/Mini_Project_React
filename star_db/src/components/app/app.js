import React from 'react';
import {Switch, Route} from 'react-router-dom';
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
        cargoCapacity: 'Cargo capacity',
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
                    <Header />
                    <ErrorBoundy>
                        <section className="top-part">
                            <RandomPlanet />
                        </section>
                    </ErrorBoundy>
                    <TestError />
                    <section className="bottom-part">
                        <ErrorBoundy>
                            <Switch>
                                <Route path='/' render={
                                    () => <h1 className="main-title">Select the appropriate section in the <span className="main-title_green">HEADER</span> above to get information</h1>
                                    } />
                                <Route path='/people' component={
                                    () => <UnitPage request="people" data={peopleStore} />
                                    } />
                                <Route path='/planets' component={
                                    () => <UnitPage request="planets" data={planetsStore} />
                                } />
                                <Route path='/starships' component={
                                    () => <UnitPage request="starships" data={starshipsStore} />
                                } />
                            </Switch>
                        </ErrorBoundy>
                    </section>
                </div>
        </ErrorBoundy>
    )
}

export default App;