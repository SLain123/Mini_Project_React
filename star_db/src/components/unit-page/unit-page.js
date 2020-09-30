import React, { Component } from 'react';
import LoadData from '../../services/load-data-service';
import ItemList from '../item-list/item-list';
import Details from '../detail-block/detail-block';
import './unit-page.css';

class UnitPage extends Component {
    allData = new LoadData();
    state = {
        activeId: 2,
        allUnits: [],
        units: {},
        load: true,
        error: false,
        imageUrl: null
    }

    componentDidMount() {
        this.getAllUnit();
        this.updateUnit();
        this.getImage();
    }

    componentDidUpdate(prevProp, prevState) {
        if(prevState.activeId !== this.state.activeId) {
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
        this.allData.getUnit(this.props.request, this.state.activeId)
            .then(units => {
                this.setState({
                    units: units,
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

    clickOnPerson = id => {
        this.setState({
            activeId: id
        })
    }

    getImage = () => {
        this.allData.getImage(this.props.request, this.state.activeId).then(url => {
            this.setState({
                imageUrl: url
            })
        })
    }

    render() {
        const {units, allUnits, load, error, imageUrl} = this.state;
        const {data} = this.props;
        return <RenderPage 
            units={units} 
            allUnits={allUnits} 
            load={load} 
            error={error} 
            imageUrl={imageUrl} 
            data={data}
            clickOnPerson={this.clickOnPerson}
            />
    }
}

const RenderPage = ({units, allUnits, load, error, imageUrl, data, clickOnPerson}) => {
    return (
        <div className="unit-page">
            <ItemList 
                allUnits={allUnits}
                load={load}
                error={error}
                clickOnPerson={clickOnPerson}/>
            <Details
                units={units}
                load={load}
                error={error}
                imageUrl={imageUrl}
                data={data}/>
        </div>
    )
}
export default UnitPage;