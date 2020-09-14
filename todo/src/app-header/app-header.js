import React from 'react';
import './app-header.css';

const AppHeader = () => {
    return (
        <div
        className="header header_pos">
            <h1
            className="header__text">
                To Do List:
            </h1>
            <span 
            className="stats stats_pos">
                5 записей, из них понравилось 0
            </span>
        </div>
    )
}

export default AppHeader;