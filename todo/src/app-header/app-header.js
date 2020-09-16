import React, {Component} from 'react';
import './app-header.css';

class AppHeader extends Component {
    render() {
        return (
            <div
            className="header header_pos">
                <h1
                className="header__text">
                    To Do List:
                </h1>
                <span 
                className="stats stats_pos">
                    5 записей, из них важных 0
                </span>
            </div>
        )
    }
}

export default AppHeader;