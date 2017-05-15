import * as React from 'react';
import { Link } from 'react-router';

import { FeaturedStore } from '../../stores/FeaturedStore.jsx';

var Slick = require('react-slick');

var wNumb = require('wnumb');

export const IndexFeatured = React.createClass({
    getInitialState() {
        return {
            items: FeaturedStore.items
        };
    },
    componentDidMount() {
        this.dataUpdated();
        FeaturedStore.bind(FeaturedStore.events.items.update, this.dataUpdated);
        FeaturedStore.getList();
    },
    componentWillUnmount() {
        FeaturedStore.unbind(FeaturedStore.events.items.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            items: FeaturedStore.items
        });
    },
    render() {
        if(this.state.items.length == 0)
            return null;

        var format = wNumb({
        	decimals: 0,
        	thousand: ','
        });

        var featured = this.state.items.map(function(item) {
            return (
                <Link to={"/property/"+item.id} className="index-featured__item" key={item.id}>
                    <div className="index-featured__image" style={{background: "url(http://idsrealty-api.fgeekdemos.org"+item.photo+")"}}>
                        <span className="index-featured__label">Featured</span>
                        <div className="index-featured__bottom">
                            <span className="index-featured__price">${format.to(parseInt(item.price))}</span>
                            <div>
                                {/* <div className="index-featured__ico index-featured__ico_heart">
                                    <span className="index-featured__ico-hint">Favorite</span>
                                </div> */}
                                <div className="index-featured__icon">
                                    <i className="fa fa-camera"></i>
                                    <span className="index-featured__hint">Photos({item.photos})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="index-featured__text">
                        <span>{item.title}</span>
                        <label>{item.bed} beds • {item.bath} baths • {item.sqft} Sq Ft</label>
                    </div>
                </Link>
            );
        });

        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            variableWidth: true,
            swipe: false
        };

        return (
            <section className="index-featured">
        		<div className="index-featured__wrap">
        			<span className="index-featured__title">Featured Properties</span>
                    <Slick {...settings}>
                        {featured}
                    </Slick>
        		</div>
        	</section>
        );
    }
})
