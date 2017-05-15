import * as React from 'react';
import { Link } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { XScrollbar } from '../../../components/XScrollbar.jsx';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { PopupStore } from '../../../stores/PopupStore.jsx';
import { FavoriteStore } from '../../../stores/FavoriteStore.jsx';
import { UserStore } from '../../../stores/UserStore.jsx';

var wNumb = require('wnumb');

export const Grid = React.createClass({
    handleFavorite(e, id){
        e.preventDefault();
        e.stopPropagation();
        if(!UserStore.token){
            PopupStore.show("auth");
            ToolbarStore.trigger(ToolbarStore.events.all.hide);
        }else{
            FavoriteStore.add.property_id = id;
            PopupStore.show("addtofavorite");
        }
    },
    render() {
        var format = wNumb({
        	decimals: 0,
        	thousand: ','
        });

        var items = "";
        items = this.props.items.map(function(item) {
            return (
                <div key={"properties-grid_"+item.id} className="properties-grid__container">
                    <article className="properties-grid__item">
                        <Link to={"/property/"+item.id} className="properties-grid__image-wrap" style={{backgroundImage: "url(http://idsrealty-api.fgeekdemos.org/"+item.photo+")"}}>
                            {(item.featured=="Y") ? <span className="properties-grid__label">Featured</span> : ""}
                            <div className="properties-grid__bottom">
                                <div className="properties-grid__prices">
                                    <span className="properties-grid__price">
                                        ${format.to(parseInt(item.price))}
                                    </span>
                                    <span className="properties-grid__price properties-grid__price_sqft">
                                        ${format.to(parseInt(item.price)/parseInt(item.sqft))}/Sqft
                                    </span>
                                </div>
                                <div>
                                    <div onClick={e => this.handleFavorite(e, item.id)} className="properties-grid__ico">
                                        <i className="fa fa-heart"></i>
                                        <span className="properties-grid__ico-hint">Favorite</span>
                                    </div>
                                    <Link to={"/property/"+item.id} className="properties-grid__ico">
                                        <i className="fa fa-camera"></i>
                                        <span className="properties-grid__ico-hint">Photos({item.photos.length})</span>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                        <div>
                            <span className="properties-grid__offer" style={{background: item.status_color}}>{item.status_name}</span>
                        </div>
                        <Link to={"/property/"+item.id} className="properties-grid__title">{item.title}</Link>
                        <span className="properties-grid__address">{item.subtitle}</span>
                        <span className="properties-grid__props">Beds: {item.bed} Bath: {item.bath} Sq Ft: {item.sqft}</span>
                        <span className="properties-grid__type">{item.type}</span>
                        <div>
                            <span className="properties-grid__contacts"><i className="fa fa-user"></i>{item.user}</span>
                            <span className="properties-grid__contacts"><i className="fa fa-calendar"></i>{item.date}</span>
                        </div>
                        <div className="properties__report" style={{fontSize: "14px", bottom: '5px', right: '10px'}}
                            onClick={ (e) => {
                                PopupStore.data.report.property_id = item.id;
                                PopupStore.show('report');
                            }}>
                            <i className="fa fa-flag"></i>
                        </div>
                    </article>
                </div>
            );
        }.bind(this))
        return (
            <div className={(this.props.type=="grid") ? "properties-grid properties-grid_opened" : "properties-grid"}>
                <XScrollbar>
                    {items}
                </XScrollbar>
			</div>
        );
    }
})
