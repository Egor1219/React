import * as React from 'react';

import { SliderStore } from '../../stores/SliderStore.jsx';

var Slick = require('react-slick');

export const IndexSlider = React.createClass({
    getInitialState() {
        return {
            items: SliderStore.items
        };
    },
    componentDidMount() {
        this.dataUpdated();
        SliderStore.bind(SliderStore.events.items.update, this.dataUpdated);
        SliderStore.getList();
    },
    componentWillUnmount() {
        SliderStore.unbind(SliderStore.events.items.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            items: SliderStore.items
        });
    },
    render() {
        var settings = {
          dots: false,
          infinite: true,
          speed: 1000,
          autoplaySpeed: 5000,
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
        var slides = this.state.items.map(function(slide) {
            return (
                <div key={slide.id} className="index-slider__slide" style={{background: 'url(http://idsrealty-api.fgeekdemos.org'+slide.image+')'}}>
                    <div className="index-slider__overlay"></div>
                    <div className="index-slider__content">
                        <h1 className="index-slider__title">{slide.title}</h1>
                        <p className="index-slider__text">{slide.subtitle}</p>
                    </div>
                </div>
            );
        });

        return (

            <Slick {...settings}>
                {slides}
            </Slick>
        );
    }
})
