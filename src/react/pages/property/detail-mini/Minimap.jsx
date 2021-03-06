import * as React from 'react';

import { PropertyStore } from '../../../stores/PropertyStore.jsx';

export const Minimap = React.createClass({
    getInitialState() {
        return {
            item: PropertyStore.item,
            container: null,
        };
    },
    componentDidMount() {
        this.dataUpdated();
        PropertyStore.bind(PropertyStore.events.item.update, this.dataUpdated);

        this.setState({
            container: $('#property-minimap')
        });
    },
    componentWillUnmount() {
        PropertyStore.unbind(PropertyStore.events.item.update, this.dataUpdated);
    },
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.item.lat == nextState.item.lat && this.state.item.lng == nextState.item.lng)
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
            var location = {lat:parseFloat(this.state.item.lat), lng: parseFloat(this.state.item.lng)};
            var container = document.getElementById('property-minimap');
            var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}];
            var mapOptions = {
                zoom: 15,
                center: location,
                scrollwheel: false,
                mapTypeControl: false,
                streetViewControl: false,
                styles : styles
            };
            var map = new google.maps.Map(document.getElementById("property-minimap"), mapOptions);
            var markerIco = '/app/i/min/map-marker.png';
            var marker = new google.maps.Marker({
                position:location,
                map: map,
                icon: "/assets/i/origin/map-marker.png"
            });
        }

        return <div id="property-minimap" className="property__minimap"></div>;
    }
})
