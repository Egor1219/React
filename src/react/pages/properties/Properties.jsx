import * as React from 'react';
import { browserHistory } from 'react-router';

import { ToolbarStore } from '../../stores/ToolbarStore.jsx';
import { PropertiesStore } from '../../stores/PropertiesStore.jsx';
import { MapStore } from '../../stores/MapStore.jsx';

import { Toolbar } from './Toolbar.jsx';

import { Grid } from './view/Grid.jsx';
import { List } from './view/List.jsx';
import { ListMap } from './view/ListMap.jsx';

export const Properties = React.createClass({
    getInitialState() {
        return {
            type: ToolbarStore.type,
            sort: ToolbarStore.sort,
            filter: ToolbarStore.filter,
            search: ToolbarStore.search,
            properties: [],
        };
    },
    componentDidMount() {
        MapStore.show();

        this.dataUpdated();
        ToolbarStore.bind(ToolbarStore.events.data.update, this.dataUpdated);
        PropertiesStore.bind(PropertiesStore.events.items.update, this.dataUpdated);
        this.setState({
            properties: [],
        });
        PropertiesStore.getList(this.props.location.query);

        if(window.upreal.map != false && this.props.location.query.lat){
            window.upreal.map.setCenter({
                lat: parseFloat(this.props.location.query.lat),
                lng: parseFloat(this.props.location.query.lng)
            });
        }
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.data.update, this.dataUpdated);
        PropertiesStore.unbind(PropertiesStore.events.items.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            type: ToolbarStore.type,
            sort: ToolbarStore.sort,
            filter: ToolbarStore.filter,
            search: ToolbarStore.search,
            properties: PropertiesStore.items,
        });
        PropertiesStore.query_last = this.props.location;
    },
    render() {
        var properties = this.state.properties;

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

        return (
            <div style={{position: "relative"}}>
                <div style={{position: "relative"}}>
                   <Toolbar />
                </div>
                <div className="properties">
                    <List type={this.state.type} items={properties}/>
                    <Grid type={this.state.type} items={properties}/>
                    <ListMap type={this.state.type} items={properties}/>
                </div>
            </div>

        );
    }
})
