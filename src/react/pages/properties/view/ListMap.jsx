import * as React from 'react';
import { Link, browserHistory } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { XScrollbar } from '../../../components/XScrollbar.jsx';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { PopupStore } from '../../../stores/PopupStore.jsx';
import { FavoriteStore } from '../../../stores/FavoriteStore.jsx';
import { UserStore } from '../../../stores/UserStore.jsx';
import { PropertyStore } from '../../../stores/PropertyStore.jsx';

var wNumb = require('wnumb');

export const ListMap = React.createClass({
    componentDidMount() {
        console.log(22);
       
    },
    goTo(id){
        PropertyStore.view = 'small';
        PropertyStore.trigger(PropertyStore.events.item.update);
        browserHistory.push("/property/"+id)
    },
    over(item){
    var image1 = {
        url: "/assets/i/origin/map-marker1.png",
        size: new google.maps.Size(50, 66),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 66)
    };
      var markerLocation1 = {lat:parseFloat(item.lat), lng: parseFloat(item.lng)};
   	 var marker1 = new google.maps.Marker({
            position: markerLocation1,
            map: window.upreal.map,
            icon: image1
        });
    	window.upreal.createInfoWindow(item, marker1);
    },
    out(item){
   window.upreal.createMarkers();
    	  window.upreal.infoWindow.close();
    },
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
                <article key={"properties-listmapmap_"+item.id}className="properties-listmap__item" >
                    <div onClick={ (e) => this.goTo(item.id)} className="properties-listmap__image-wrap" onMouseOver={(e)=>this.over(item)} onMouseOut={(e)=>this.out(item)} style={{backgroundImage: "url(http://idsrealty-api.fgeekdemos.org/"+item.photo+")"}}>
                        {(item.featured=="Y") ? <span className="properties-listmap__label">Featured</span> : ""}
                        <div className="properties-listmap__bottom">
                            <div onClick={e => this.handleFavorite(e, item.id)} className="properties-listmap__ico">
                                <i className="fa fa-heart"></i>
                                <span className="properties-listmap__ico-hint">Favorite</span>
                            </div>
                            <Link to={"/property/"+item.id} className="properties-listmap__ico">
                                <i className="fa fa-camera"></i>
                                <span className="properties-listmap__ico-hint">Photos({item.photos.length})</span>
                            </Link>
                        </div>
                    </div>
                    <div className="properties-listmap__info">
                        <div>
                            <span className="properties-listmap__offer" style={{background: item.status_color}}>{item.status_name}</span>
                        </div>
                        <div onClick={ (e) => this.goTo(item.id)} className="properties-listmap__title">{item.title}</div>
                        <span className="properties-listmap__address">{item.subtitle}</span>
                        <span className="properties-listmap__props">Beds: {item.bed} Bath: {item.bath} Sq Ft: {item.sqft}</span>
                        <span className="properties-listmap__type">{item.type}</span>
                        <span className="properties-listmap__contacts"><i className="fa fa-user"></i>{item.user}</span>
                        <span className="properties-listmap__contacts"><i className="fa fa-calendar"></i>{item.date}</span>
                    </div>
                    <div className="properties-listmap__prices">
                        <span className="properties-listmap__price">${format.to(parseInt(item.price))}</span>
                        <span className="properties-listmap__price properties-listmap__price_sqft">${format.to(parseInt(item.price)/parseInt(item.sqft))}/Sqft</span>
                    </div>
                    <div className="properties__report" style={{fontSize: "13px", bottom: '5px', right: '15px'}}
                        onClick={ (e) => {
                            PopupStore.data.report.property_id = item.id;
                            PopupStore.show('report');
                        }}>
                        <i className="fa fa-flag"></i>
                    </div>
                </article>
            );
        }.bind(this))
        return (
            <div className={(this.props.type=="list_map") ? "properties-listmap properties-listmap_opened" : "properties-listmap"}>
                <XScrollbar>
    				{items}
                </XScrollbar>
			</div>
        );
    }
})
