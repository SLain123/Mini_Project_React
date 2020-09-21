import React, {Component} from 'react';
import './header.css';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1 className="header__logo">Star DB</h1>
                <nav className="nav nav_pos">
                    <a className="nav__link" href="http://ya.ru">People</a>
                    <a className="nav__link" href="http://ya.ru">Planets</a>
                    <a className="nav__link" href="http://ya.ru">Starships</a>
                </nav>
            </header>
        )
    }
}

export default Header;