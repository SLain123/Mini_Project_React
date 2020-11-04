import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import UnitPage from '../unit-page/unit-page';
import ErrorBoundy from '../error-boundy/error-boundy';
import TestError from '../test-error/test-error';
import ErrorMessage from '../error-message/error-message';

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
                                <Route exact path='/' render={
                                    () => <h1 className="main-title">Select the appropriate section in the <span className="main-title_green">HEADER</span> above to get information</h1>
                                    } />
                                <Route path='/people/:id' component={
                                    (url) => <UnitPage request="people" data={peopleStore} url={url} />
                                    } />
                                <Route path='/planets/:id' component={
                                    (url) => <UnitPage request="planets" data={planetsStore} url={url}/>
                                } />
                                <Route path='/starships/:id' component={
                                    (url) => <UnitPage request="starships" data={starshipsStore} url={url} />
                                } />
                                <Route component={ErrorMessage} />
                            </Switch>
                        </ErrorBoundy>
                    </section>
                </div>
        </ErrorBoundy>
    )
}

export default App;