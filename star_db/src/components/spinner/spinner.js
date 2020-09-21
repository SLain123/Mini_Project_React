import React from 'react';
import './spinner.css';

const Spinner = () => {
    return (
        <div className="loadingio-spinner-blocks">
            <div className="ldio">
                <div style={{left: '8.85px', top:'8.85px', animationDelay: '0s'}}></div>
                <div style={{left: '51.33px', top: '8.85px', animationDelay: '0.08169934640522876s'}}></div>
                <div style={{left: '93.81px', top: '8.85px', animationDelay: '0.16339869281045752s'}}></div>
                <div style={{left: '136.29px', top: '8.85px', animationDelay: '0.24509803921568626s'}}></div>
                <div style={{left: '8.85px', top: '51.33px', animationDelay: '0.8986928104575164s'}}></div>
                <div style={{left: '136.29px', top: '51.33px', animationDelay: '0.32679738562091504s'}}></div>
                <div style={{left: '8.85px', top: '93.81px', animationDelay: '0.8169934640522876s'}}></div>
                <div style={{left: '136.29px', top: '93.81px', animationDelay: '0.4084967320261438s'}}></div>
                <div style={{left: '8.85px', top: '136.29px', animationDelay: '0.7352941176470588s'}}></div>
                <div style={{left: '51.33px', top: '136.29px', animationDelay: '0.6535947712418301s'}}></div>
                <div style={{left: '93.81px', top: '136.29px', animationDelay: '0.5718954248366013s'}}></div>
                <div style={{left: '136.29px', top: '136.29px', animationDelay: '0.49019607843137253s'}}></div>
            </div>
        </div>
    )
}

export default Spinner;