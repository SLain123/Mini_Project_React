import React from 'react';
import './error-message.css';
import icon from './error.gif';

const ErrorMessage = () => {
    return (
        <div className="error">
            <img src={icon} alt='exploid error' className='error__pic'/>
            <span className="error__text error__text_big">ERROR!</span>
            <span className="error__text">An error occurred during loading. For more information, see the console.log</span>
        </div>
    )
}

export default ErrorMessage;