import * as React from 'react';
import { Link } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { XScrollbar } from '../../../components/XScrollbar.jsx';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { PopupStore } from '../../../stores/PopupStore.jsx';
import { FavoriteStore } from '../../../stores/FavoriteStore.jsx';
import { UserStore } from '../../../stores/UserStore.jsx';

var Slick = require('react-slick');

var wNumb = require('wnumb');

export const List = React.createClass({
    componentDidMount() {

    },
    addToFavorite(e, property_id){
        e.preventDefault();
        e.stopPropagation();
        if(!UserStore.token){
            PopupStore.show("auth");
            ToolbarStore.trigger(ToolbarStore.events.all.hide);
        }else{
            FavoriteStore.add.property_id = property_id;
            PopupStore.show("addtofavorite");
        }
    },
    render() {
        var format = wNumb({
        	decimals: 0,
        	thousand: ','
        });

        var slick_settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            fade: true,
            swipeToSlide: false,
            swipe: false,
            touchMove: false,
            draggable: false,
            arrows: true,
        };


        var items = "";
        items = this.props.items.map(function(item) {
            var slick_slides = item.photos.map(function(image) {
                return (
                    <div key={image} className="properties-list__slide" style={{background: 'url(http://idsrealty-api.fgeekdemos.org'+image+')'}}>
                    </div>
                );
            });
            return (
                <article key={"list_"+item.id} className="properties-list__item">
                    <div className="properties-list__image-wrap" style={{backgroundImage: "url(http://idsrealty-api.fgeekdemos.org/"+item.photo+")"}}>
                        {/* <div className="properties-list__slider">
                            <Slick {...slick_settings}>
                                {slick_slides}
                            </Slick>
                        </div> */}
                        <div className="properties-list__bottom">
                            <div onClick={(e) => this.addToFavorite(e, item.id)} className="properties-list__ico">
                                <i className="fa fa-heart"></i>
                                <span className="properties-list__ico-hint">Favorite</span>
                            </div>
                            <Link to={"/property/"+item.id} className="properties-list__ico">
                                <i className="fa fa-camera"></i>
                                <span className="properties-list__ico-hint">Photos({item.photos.length})</span>
                            </Link>
                        </div>
                    </div>

                    {/* <Link to={"/property/"+item.id} className="properties-list__image-wrap" style={{backgroundImage: "url(http://idsrealty-api.fgeekdemos.org/"+item.photo+")"}}>
                        {(item.featured=="Y") ? <span className="properties-list__label">Featured</span> : ""}
                        <div className="properties-list__bottom">
                            <div onClick={(e) => this.addToFavorite(e, item.id)} className="properties-list__ico properties-list__ico_heart">
                                <span className="properties-list__ico-hint">Favorite</span>
                            </div>
                            <div className="properties-list__ico properties-list__ico_photo">
                                <span className="properties-list__ico-hint">Photos({item.photos.length})</span>
                            </div>
                        </div>
                    </Link> */}
                    <div className="properties-list__info">
                        <div>
                            <span className="properties-list__offer" style={{background: item.status_color}}>{item.status_name}</span>
                        </div>
                        <Link to={"/property/"+item.id} className="properties-list__title">{item.title}</Link>
                        <span className="properties-list__address">{item.subtitle}</span>
                        <span className="properties-list__props">Beds: {item.bed} Bath: {item.bath} Sq Ft: {item.sqft}</span>
                        <span className="properties-list__type">{item.type}</span>
                        <p className="properties-list__text">{item.desc}</p>
                        <div>
                            <span className="properties-list__contacts"><i className="fa fa-user"></i>{item.user}</span>
                            <span className="properties-list__contacts"><i className="fa fa-calendar"></i>{item.date}</span>
                        </div>
                    </div>
                    <div className="properties-list__prices">
                        <span className="properties-list__price">
                            ${format.to(parseInt(item.price))}
                        </span>
                        <span className="properties-list__price properties-list__price_sqft">
                            ${format.to(parseInt(item.price)/parseInt(item.sqft))}/Sqft
                        </span>
                    </div>
                    <div className="properties__report"
                        onClick={ (e) => {
                            PopupStore.data.report.property_id = item.id;
                            PopupStore.show('report');
                        }}>
                        <i className="fa fa-flag"></i>
                    </div>
                </article>
            );
        }.bind(this));
        return (
            <div className={(this.props.type=="list") ? "properties-list properties-list_opened" : "properties-list"}>
                <XScrollbar>
                    {items}
                </XScrollbar>
			</div>
        );
    }
})
