import * as React from 'react';
import { browserHistory } from 'react-router';
import Nouislider from 'react-nouislider';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { PropertiesStore } from '../../../stores/PropertiesStore.jsx';

var wNumb = require('wnumb');

export const AdvancedSearch = React.createClass({
    getInitialState() {
        return {
            active: false,
            price: [0, 1600000],
            beds: [0, 6],
            sqft: [0, 20000],
            baths: [0, 6]
        };
    },
    componentDidMount() {
        ToolbarStore.bind(ToolbarStore.events.all.hide, this.hide);
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.all.hide, this.hide);
    },
    hide(){
        this.setState({
            active: false
        });
    },
    range(type, value){
        var obj = {};
        obj[type] = [parseInt(value[0]), parseInt(value[1])];
        this.setState(obj);
    },
    toggle(event){
         event.stopPropagation();
         var v = this.state.active;
         ToolbarStore.trigger(ToolbarStore.events.all.hide);
         this.setState({active: !v});
    },
    advancedSearch(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            active: false,
        });
        var loc = browserHistory.getCurrentLocation();

        var query = {
            query: loc.query.query,
            status: loc.query.status,
            type: loc.query.type,
            price: this.state.price,
            baths: this.state.baths,
            beds: this.state.beds,
            sqft: this.state.sqft,
        };
        console.log(query);
        loc.query = query;
        browserHistory.push(loc);
        PropertiesStore.getList(loc.query);
    },
    render() {
        var format = wNumb({
        	decimals: 0,
        	thousand: ','
        });

        var btnClass = "toolbar__button"
        var listClass = "toolbar__list toolbar__list_filter";
        if(this.state.active){
            btnClass += " toolbar__button_active";
            listClass += " toolbar__list_active";
        }

        return (
            <div className="toolbar__block">
                <div className={btnClass} onClick={this.toggle}>
                    <i className="fa fa-sliders"></i>
                    <span>Advanced Search</span>
                </div>
                <div className={listClass}>
                    <span className="toolbar__label">Price<br/>from ${format.to(parseInt(this.state.price[0]))} to ${format.to(parseInt(this.state.price[1]))}</span>
                    <Nouislider
                        range={{min: 0, max: 1600000}}
                        start={this.state.price}
                        step={1}
                        onSlide={(value) => this.range("price", value)}
                    />
                    <div className="toolbar__values">
                        <span>${format.to(parseInt(this.state.price[0]))}</span>
                        <span>${format.to(parseInt(this.state.price[1]))}</span>
                    </div>

                    <span className="toolbar__label">Beds<br/>from {format.to(parseInt(this.state.beds[0]))} to {format.to(parseInt(this.state.beds[1]))}</span>
                    <Nouislider
                        range={{min: 0, max: 6}}
                        start={this.state.beds}
                        step={1}
                        onSlide={(value) => this.range("beds", value)}
                    />
                    <div className="toolbar__values">
                        <span>{format.to(parseInt(this.state.beds[0]))}</span>
                        <span>{format.to(parseInt(this.state.beds[1]))}</span>
                    </div>

                    <span className="toolbar__label">Baths<br/>from {format.to(parseInt(this.state.baths[0]))} to {format.to(parseInt(this.state.baths[1]))}</span>
                    <Nouislider
                        range={{min: 0, max: 6}}
                        start={this.state.baths}
                        step={1}
                        onSlide={(value) => this.range("baths", value)}
                    />
                    <div className="toolbar__values">
                        <span>{format.to(parseInt(this.state.beds[0]))}</span>
                        <span>{format.to(parseInt(this.state.beds[1]))}</span>
                    </div>

                    <span className="toolbar__label">Area<br/>from {format.to(parseInt(this.state.sqft[0]))} to {format.to(parseInt(this.state.sqft[1]))} Sq Ft</span>
                    <Nouislider
                        range={{min: 0, max: 20000}}
                        start={this.state.sqft}
                        step={1}
                        onSlide={(value) => this.range("sqft", value)}
                    />
                    <div className="toolbar__values">
                        <span>{format.to(parseInt(this.state.sqft[0]))}</span>
                        <span>{format.to(parseInt(this.state.sqft[1]))}</span>
                    </div>
                    <div className="toolbar__button" onClick={this.advancedSearch} style={{marginTop: '20px', width: '120px', marginLeft: '40px'}}>
                        <i className="fa fa-search"></i>
                        <span>Search</span>
                    </div>
                </div>
            </div>
        );
    }
})
