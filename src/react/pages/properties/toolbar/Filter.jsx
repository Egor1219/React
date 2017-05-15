import * as React from 'react';
import Nouislider from 'react-nouislider';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';

import { Select } from '../../../components/Select.jsx';

var wNumb = require('wnumb');

export const Filter = React.createClass({
    getInitialState() {
        return {
            active: false,
            filter: ToolbarStore.filter,
            data: ToolbarStore.data,
        };
    },
    componentDidMount() {
        ToolbarStore.bind(ToolbarStore.events.filter.changed, this.dataUpdated);
        ToolbarStore.bind(ToolbarStore.events.all.hide, this.hide);
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.filter.changed, this.dataUpdated);
        ToolbarStore.unbind(ToolbarStore.events.all.hide, this.hide);
    },
    dataUpdated(){
        this.setState({
            filter: ToolbarStore.filter,
            data: ToolbarStore.data,
        });
    },
    hide(){
        this.setState({
            active: false
        });
    },
    toggle(event){
         event.stopPropagation();
         var v = this.state.active;
         ToolbarStore.trigger(ToolbarStore.events.all.hide);
         this.setState({active: !v});
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
                    <i className="fa fa-filter"></i>
                    <span>Filter</span>
                </div>
                <div className={listClass}>
					<span className="toolbar__label">Price<br/>from ${format.to(parseInt(this.state.filter.price[0]))} to ${format.to(parseInt(this.state.filter.price[1]))}</span>
					<Nouislider
                        range={{min: this.state.data.price[0], max: this.state.data.price[1]}}
                        start={this.state.filter.price}
                        step={1}
                        onSlide={(value) => ToolbarStore.range("price", value)}
                        onEnd={(value) => ToolbarStore.trigger(ToolbarStore.events.data.update)}
                      />
                     <div className="toolbar__values">
							<span>${format.to(parseInt(this.state.data.price[0]))}</span>
							<span>${format.to(parseInt(this.state.data.price[1]))}</span>
						 </div>
					<span className="toolbar__label">Area<br/>from {format.to(parseInt(this.state.filter.sqft[0]))} to {format.to(parseInt(this.state.filter.sqft[1]))} Sq Ft</span>
					<Nouislider
                        range={{min: this.state.data.sqft[0], max: this.state.data.sqft[1]}}
                        start={this.state.filter.sqft}
                        step={1}
                        onSlide={(value) => ToolbarStore.range("sqft", value)}
                        onEnd={(value) => ToolbarStore.trigger(ToolbarStore.events.data.update)}
                      />
                     <div className="toolbar__values">
						<span>{format.to(parseInt(this.state.data.sqft[0]))}</span>
						<span>{format.to(parseInt(this.state.data.sqft[1]))}</span>
					 </div>
                    {/* <div className="prop__bedrooms">
                        <span className="prop__label">Type</span>
						<Select items={this.state.data.types}
                                value={this.state.filter.type}
                                onSelect={(value) => ToolbarStore.select("type", value)}
                                autoHide={false}
                                search/>
					</div> */}

                    {/* <div className="prop__button">Search</div> */}
                </div>
            </div>
        );
    }
})
