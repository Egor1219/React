import * as React from 'react';
import { browserHistory } from 'react-router';

import { ToolbarStore } from '../../stores/ToolbarStore.jsx';
import { PropertyStore } from '../../stores/PropertyStore.jsx';
import { PropertiesStore } from '../../stores/PropertiesStore.jsx';
import { MapStore } from '../../stores/MapStore.jsx';

import { Navigation } from './Navigation.jsx';
import { ToolbarTabs } from './ToolbarTabs.jsx';
import { ViewSwitcher } from './ViewSwitcher.jsx';

import { PropertyDetail } from './detail/PropertyDetail.jsx';
import { PropertyDetailMini } from './detail-mini/PropertyDetailMini.jsx';

export const Property = React.createClass({
    getInitialState() {
        return {
            filter: ToolbarStore.filter,
            sort: ToolbarStore.sort,
            properties: PropertiesStore.items,
            item: PropertyStore.item,
            tab: 'slider',
            view: PropertyStore.view
        };
    },
    componentDidMount() {
        $(window).scrollTop(0);

        this.setState({
            filter: ToolbarStore.filter,
            sort: ToolbarStore.sort,
            properties: PropertiesStore.items,
            item: PropertyStore.item,
            view: PropertyStore.view
        });
        PropertyStore.bind(PropertyStore.events.item.update, this.dataUpdated);
        PropertiesStore.bind(PropertiesStore.events.items.update, this.dataUpdated);

        PropertyStore.getById(this.props.params.propertyId);
    },
    componentWillUnmount() {
        PropertyStore.unbind(PropertyStore.events.item.update, this.dataUpdated);
        PropertiesStore.unbind(PropertiesStore.events.items.update, this.dataUpdated);
    },
    componentWillReceiveProps(nextProps){
        PropertyStore.getById(nextProps.params.propertyId);
    },
    shouldComponentUpdate(nextProps, nextState){
        if(this.props == nextProps && this.state == nextState)
            return false;
        return true;
    },
    dataUpdated(){
        if(PropertyStore.view == "big"){
            MapStore.hide();
        }else{
            MapStore.show();
        }
        this.setState({
            filter: ToolbarStore.filter,
            properties: PropertiesStore.items,
            item: PropertyStore.item,
            view: PropertyStore.view,
        });
    },
    filter(properties){
        properties = properties.filter(function(property) {
            return  parseInt(property.price) >= parseInt(this.state.filter.price[0]) &&
                    parseInt(property.price) <= parseInt(this.state.filter.price[1]) &&
                    parseInt(property.sqft) >= parseInt(this.state.filter.sqft[0]) &&
                    parseInt(property.sqft) <= parseInt(this.state.filter.sqft[1]);
        }.bind(this));

        if(this.state.sort.order=="asc"){
            properties.sort(function(a, b) {
                return parseInt(a[this.state.sort.type]) - parseInt(b[this.state.sort.type]);
            }.bind(this));
        }else{
            properties.sort(function(b, a) {
                return parseInt(a[this.state.sort.type]) - parseInt(b[this.state.sort.type]);
            }.bind(this));
        }
        return properties;
    },
    handleTabChange(name){
        this.setState({
            tab: name
        });
    },
    render() {
        var properties = this.filter(this.state.properties);

        var detail = <PropertyDetail tab={this.state.tab} item={this.state.item}/>;
        if(this.state.view == "small"){
            detail = <PropertyDetailMini tab={this.state.tab} item={this.state.item}/>
        }

        return (
            <div className="property">
                <div className="toolbar">
                    <div className="toolbar__wrap">
                        <Navigation item={this.state.item} items={properties}/>
                        <ToolbarTabs tab={this.state.tab} onChange={this.handleTabChange} item={this.state.item}/>
                        <ViewSwitcher />
                    </div>
                </div>
                {detail}
            </div>

        );
    }
})
