import * as React from 'react';

var Slick = require('react-slick');

import { PropertyStore } from '../../../stores/PropertyStore.jsx';

export const Slider = React.createClass({
    getInitialState() {
        return {
            item: PropertyStore.item,
        };
    },
    componentDidMount() {
        this.dataUpdated();
        PropertyStore.bind(PropertyStore.events.item.update, this.dataUpdated);
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
        if(this.state.item.photos.length == 0){
            return null;
        }
        var slick_settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            fade: true,
            swipeToSlide: false,
            swipe: false,
            touchMove: false,
            draggable: false,
            arrows: true,
        };

        var slick_slides = this.state.item.photos.map(function(image) {
            return (
                <div key={image.path} className="property__slide" style={{background: 'url(http://idsrealty-api.fgeekdemos.org'+image.path+')'}}>
                </div>
            );
        });

        return (
            <Slick {...slick_settings}>
                {slick_slides}
            </Slick>
        );
    }
})
