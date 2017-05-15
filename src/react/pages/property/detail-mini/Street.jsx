import * as React from 'react';

import { PropertyStore } from '../../../stores/PropertyStore.jsx';

export const Street = React.createClass({
    getInitialState() {
        return {
            item: PropertyStore.item,
            container: null
        };
    },
    componentDidMount() {
        this.dataUpdated();
        PropertyStore.bind(PropertyStore.events.item.update, this.dataUpdated);

        this.setState({
            container: $('#panorama')
        });
    },
    componentWillUnmount() {
        PropertyStore.unbind(PropertyStore.events.item.update, this.dataUpdated);
    },
    shouldComponentUpdate(nextProps, nextState){
        if(this.props == nextProps && this.state == nextState)
            return false;
        return true;
    },
    dataUpdated(){
        this.setState({
            item: PropertyStore.item
        });
    },
    render() {
        if(this.state.container != null){
            var container = document.getElementById('panorama');
            var panorama = new google.maps.StreetViewPanorama(
                container, {
                    zoom: 1
                });
            panorama.setPosition( {lat:parseFloat(this.state.item.lat), lng: parseFloat(this.state.item.lng)});
        }

        return <div id="panorama" className="property-mini__map"></div>;
    }
})
