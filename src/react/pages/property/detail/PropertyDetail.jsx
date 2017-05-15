import * as React from 'react';

import { Tabs } from './Tabs.jsx';
import { Minimap } from './Minimap.jsx';

var wNumb = require('wnumb');

export const PropertyDetail = React.createClass({
    shouldComponentUpdate(nextProps, nextState){
        if(this.props == nextProps && this.state == nextState)
            return false;
        return true;
    },
    render() {
        var format = wNumb({
            decimals: 0,
            thousand: ','
        });

        var features = <div className="property__feature">None</div>;
        if(this.props.item.features.length != 0){
            features = this.props.item.features.map(function(item){
                return <div key={item.name} className="property__feature"><i className="fa fa-long-arrow-right"></i>{item.name}</div>;
            });
        }

        return(
            <div className="property__detail">
                <Tabs tab={this.props.tab} item={this.props.item}/>
                <div className="property__anchors">
                    <a href="#preview" className="property__anchor">Preview</a>
                    <a href="#description" className="property__anchor">Description</a>
                    <a href="#features" className="property__anchor">Features</a>
                    <a href="#contacts" className="property__anchor">Contacts</a>
                </div>
                <div className="property__wrap">
                    <div className="property__columns">
                        <div className="property__column property__column_8">
                            <div className="property__title">
                                <div className="property__name">
                                    {this.props.item.title}
                                    <br/>
                                    <span>{this.props.item.subtitle}</span>
                                </div>
                                <div className="property__price">${format.to(parseInt(this.props.item.price))}</div>
                            </div>
                            <div className="property__about"><span>Province:</span> {this.props.item.province}</div>
                            <div className="property__about"><span>City:</span> {this.props.item.city}</div>
                            <div className="property__about"><span>Zipcode:</span> {this.props.item.zipcode}</div>
                            <div className="property__props" id="description">
                                <div className="property__prop">Type: {this.props.item.type}</div>
                                <div className="property__prop">Beds: {this.props.item.bed}</div>
                                <div className="property__prop">Baths: {this.props.item.bath}</div>
                                <div className="property__prop">{this.props.item.sqft} sq. ft.</div>
                            </div>
                            <div className="property__desc">{this.props.item.description}</div>
                            <div className="property__section" id="features">Features</div>
                            {features}
                            <div className="property__section" id="contacts">Contacts/Agent</div>
                            <div className="property__about"><span>Name:</span> {this.props.item.agent.name}</div>
                            <div className="property__about"><span>Phone:</span> {this.props.item.agent.phone}</div>
                            <div className="property__section" id="contacts">Contacts/Office</div>
                            <div className="property__about"><span>City:</span> {this.props.item.agent.city}</div>
                            <div className="property__about"><span>Address:</span> {this.props.item.agent.address}</div>
                            <div className="property__about"><span>Phone:</span> {this.props.item.agent.phones}</div>
                        </div>
                        <div className="property__column property__column_4">
                            <Minimap />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
