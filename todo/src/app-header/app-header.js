import React, {Component} from 'react';
import './app-header.css';

class AppHeader extends Component {
    render() {
        const {all, countAlarm} = this.props;

        return (
            <div
            className="header header_pos">
                <h1
                className="header__text">
                    To Do List:
                </h1>
                <span 
                className="stats stats_pos">
                    Всего {all} задач(и), из них важных {countAlarm}
                </span>
            </div>
        )
    }
}

export default AppHeader;