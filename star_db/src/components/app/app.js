import React, {Component} from 'react';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import PeoplePage from '../people-page/people-page';

import './app.css';

class App extends Component {
    componentDidCatch(error) {
        console.log(`Global error: ${error}`);
    }

    render() {
        return (
            <div className="main">
                <Header/>
                <section className="top-part">
                    <RandomPlanet/>
                </section>
                <section className="bottom-part">
                    <PeoplePage/>
                </section>
            </div>
        )
    }
}

export default App;