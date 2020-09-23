import React, {Component} from 'react';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemList from '../item-list/item-list';
import Details from '../detail-block/detail-block';

import './app.css';

class App extends Component {
    state = {
        activeId: 1
    }

    clickOnPerson = id => {
        this.setState({
            activeId: id
        })
    }

    render() {
        return (
            <div className="main">
                <Header/>
                <section className="top-part">
                    <RandomPlanet/>
                </section>
                <section className="bottom-part">
                    <ItemList
                    clickOnPerson={this.clickOnPerson}/>
                    <Details
                    activeId={this.state.activeId}/>
                </section>
            </div>
        )
    }
}

export default App;