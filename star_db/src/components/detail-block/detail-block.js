import React, {Component} from 'react';
import './detail-block.css';

class Details extends Component {
    render() {
        return (
            <div className="detail detail_pos">
                <img 
                    className="detail__pic"
                    src="https://static.my-shop.ru/product/3/378/3770185.jpg"
                    alt="unit"
                    width="200"
                    height="230"/>
                <div className="detail__info-block">
                    <h1 className="detail__info-title">R2-D2</h1>
                    <ul className="detail__info-detals-list">
                        <li className="detail__info-details-item">Gender: m</li>
                        <li className="detail__info-details-item">Birt year: 19000</li>
                        <li className="detail__info-details-item">Eye color: blue</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Details;