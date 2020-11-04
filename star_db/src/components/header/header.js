import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <Link className="header__logo-link" to="/">
                <h1 className="header__logo">Star DB</h1>
            </Link>
            <nav className="nav nav_pos">
                <Link className="nav__link" to="/people/1">People</Link>
                <Link className="nav__link" to="/planets/2">Planets</Link>
                <Link className="nav__link" to="/starships/12">Starships</Link>
            </nav>
        </header>
    )
}

export default Header;