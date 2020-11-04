import React, { Component } from 'react';
import LoadData from '../../services/load-data-service';
import ItemList from '../item-list/item-list';
import Details from '../detail-block/detail-block';
import PropTypes from 'prop-types';
import './unit-page.css';

class UnitPage extends Component {
    allData = new LoadData();
    state = {
        allUnits: [],
        units: {},
        load: true,
        error: false,
        imageUrl: null
    }

    static propTypes = {
        request: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.getAllUnit();
        this.updateUnit();
        this.getImage();
    }

    componentDidUpdate(prevProp) {
        if(prevProp.url.match.params.id !== this.props.url.match.params.id) {
            this.updateUnit()
            this.getImage()
        }
    }

    getAllUnit() {
        return this.allData.getAllUnit(this.props.request)
        .then(data => {
            this.setState({
                allUnits: data,
                load: false
            })
        })
        .catch(error => {
            this.setState({
                load: false,
                error: true
            })
            console.log(error);
        })
    }

    updateUnit() {
        this.allData.getUnit(this.props.request, this.props.url.match.params.id)
            .then(units => {
                this.setState({
                    units: units,
                    load: false,
                })
            })
            .catch(error => {
                this.setState({
                    load: false,
                    error: true
                })
                console.log(error);
            })
    }

    getImage = () => {
        this.allData.getImage(this.props.request, this.props.url.match.params.id).then(url => {
            this.setState({
                imageUrl: url
            })
        })
    }

    render() {
        const {allUnits, load, error, units, imageUrl} = this.state;
        const {data} = this.props;
        
        return (
            <div className="unit-page">
                <ItemList 
                    allUnits={allUnits}
                    load={load}
                    error={error} />
                <Details 
                    load={load}
                    error={error}
                    units={units}
                    data={data}
                    imageUrl={imageUrl}/>
            </div>
        )
    }
}

export default UnitPage;