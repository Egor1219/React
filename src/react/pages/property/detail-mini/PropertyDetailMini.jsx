import * as React from 'react';

import { Tabs } from './Tabs.jsx';
import { Minimap } from './Minimap.jsx';

import PerfectScrollbar from 'react-perfect-scrollbar';

import { XScrollbar } from '../../../components/XScrollbar.jsx';

var wNumb = require('wnumb');

export const PropertyDetailMini = React.createClass({
    getInitialState() {
        return {
            info: 'detail'
        };
    },
    shouldComponentUpdate(nextProps, nextState){
        if(this.props == nextProps && this.state == nextState)
            return false;
        return true;
    },
    setInfo(type){
        this.setState({
            info: type
        });
    },
    render() {
        var format = wNumb({
            decimals: 0,
            thousand: ','
        });

        var features = <div className="property-mini__feature">None</div>;
        if(this.props.item.features.length != 0){
            features = this.props.item.features.map(function(item){
                return <div key={item.name} className="property-mini__feature"><i className="fa fa-long-arrow-right"></i>{item.name}</div>;
            });
        }

        return(
            <div className="property-mini__wrap">
                <div className="property-mini__detail">
                    <div className="property-mini__title">
                        <div className="property-mini__name">
                            {this.props.item.title}
                        </div>
                        <div className="property-mini__price">${format.to(parseInt(this.props.item.price))}</div>
                    </div>
                    <Tabs tab={this.props.tab} item={this.props.item}/>
                    {/* <div className="property-mini__anchors">
                        <div onClick={ (e) => this.setInfo('detail') } className="property-mini__anchor">Detail</div>
                        <div onClick={ (e) => this.setInfo('description') } className="property-mini__anchor">Description</div>
                        <div onClick={ (e) => this.setInfo('features') } className="property-mini__anchor">Features</div>
                        <div onClick={ (e) => this.setInfo('contacts') } className="property-mini__anchor">Contacts</div>
                    </div> */}
                    <div className="property-mini__container">
                        <XScrollbar>
                            {/* <div className={(this.state.info == "detail") ? "property-mini__content" : "property-mini__content property-mini__content_hidden"}> */}
                            <div className="property-mini__content">
                                <div className="property-mini__section">Detail</div>
                                <div className="property-mini__about"><span>Province:</span> {this.props.item.province}</div>
                                <div className="property-mini__about"><span>City:</span> {this.props.item.city}</div>
                                <div className="property-mini__about"><span>Zipcode:</span> {this.props.item.zipcode}</div>
                                <div className="property-mini__about"><span>Type:</span> {this.props.item.type}</div>
                                <div className="property-mini__about"><span>Beds:</span> {this.props.item.bed}</div>
                                <div className="property-mini__about"><span>Baths:</span> {this.props.item.bath}</div>
                                <div className="property-mini__about"><span>Area: </span>{this.props.item.sqft} sq. ft.</div>
                            </div>
                            {/* <div className={(this.state.info == "description") ? "property-mini__content" : "property-mini__content property-mini__content_hidden"}> */}
                            <div className="property-mini__content">
                                <div className="property-mini__section">Description</div>
                                {/* <PerfectScrollbar> */}
                                    <div className="property-mini__desc">{this.props.item.description}</div>
                                {/* </PerfectScrollbar> */}
                            </div>
                            {/* <div className={(this.state.info == "features") ? "property-mini__content" : "property-mini__content property-mini__content_hidden"}> */}
                            <div className="property-mini__content">
                                <div className="property-mini__section">Features</div>
                                {features}
                            </div>
                            {/* <div className={(this.state.info == "contacts") ? "property-mini__content" : "property-mini__content property-mini__content_hidden"}> */}
                            <div className="property-mini__content">
                                <div className="property-mini__section">Contacts</div>
                                {/* <PerfectScrollbar> */}
                                    <div className="property-mini__about"><span>Name:</span> {this.props.item.agent.name}</div>
                                    <div className="property-mini__about"><span>Phone:</span> {this.props.item.agent.phone}</div>
                                    <div className="property-mini__about"><span>Office City:</span> {this.props.item.agent.city}</div>
                                    <div className="property-mini__about"><span>Office Address:</span> {this.props.item.agent.address}</div>
                                    <div className="property-mini__about"><span>Office Phone:</span> {this.props.item.agent.phones}</div>
                                {/* </PerfectScrollbar> */}
                            </div>
                        </XScrollbar>
                    </div>
                </div>
            </div>
        )
    }
})
