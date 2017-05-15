import * as React from 'react';
import { browserHistory } from 'react-router';

import { PropertiesStore } from '../stores/PropertiesStore.jsx';
import { PropertyStore } from '../stores/PropertyStore.jsx';
import { MapStore } from '../stores/MapStore.jsx';

var wNumb = require('wnumb');

window.upreal = {};
window.upreal.map = false;
window.upreal.idle = false;
window.upreal.markers = [];
window.upreal.infoWindow = false;
window.upreal.items = PropertiesStore.items;
window.upreal.item = PropertyStore.item;
var drawingManager;
 var circle;
 var rad = function(x) {
  return x * Math.PI / 180;
};
var getDistance = function(p11,p12, p21,p22) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p21 - p11);
  var dLong = rad(p22 - p12);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p11)) * Math.cos(rad(p21)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

window.upreal.format = wNumb({
    decimals: 0,
    thousand: ','
});

window.upreal.init = function(){


 window.upreal.map= new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

   drawingManager = new google.maps.drawing.DrawingManager({
    //drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['circle', 'polygon', ]
    },
    markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 0.3,
      strokeWeight: 2,
      clickable: false,
      editable: false,
      zIndex: 1
    }
  });
  drawingManager.setMap(window.upreal.map);
 
  
  
   // window.upreal.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    window.upreal.infoWindow = new google.maps.InfoWindow();
    
    // var trafficLayer = new google.maps.TrafficLayer();
   // trafficLayer.setMap(map);

  
}
window.upreal.clearMarkers = function(){
    for (var i = 0; i < window.upreal.markers.length; i++) {
        window.upreal.markers[i].setMap(null);
    }
    window.upreal.markers = [];
}
window.upreal.circleMarkers=function(){
	 google.maps.event.addListener(drawingManager, 'circlecomplete', function(shape){
  	 if (shape == null || (!(shape instanceof google.maps.Circle))) return;

        if (circle != null) {
            circle.setMap(null);
            circle = null;
        }

        circle = shape;
        
        console.log('radius', circle.getRadius());
        console.log('lat', circle.getCenter().lat());
        console.log('lng', circle.getCenter().lng());
        console.log('location',new google.maps.LatLng(circle.getCenter().lat(), circle.getCenter().lng()));
         if(window.upreal.items.length == 0)
        return;

    var image = {
        url: "/assets/i/origin/map-marker.png",
        size: new google.maps.Size(50, 66),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 66)
    };
    window.upreal.items.forEach(function(element, index, array) {
    if(circle.getRadius()>getDistance(circle.getCenter().lat(),circle.getCenter().lng(),parseFloat(element.lat),parseFloat(element.lng))){
    	console.log(circle.getRadius()+'>'+getDistance(circle.getCenter().lat(),circle.getCenter().lng(),parseFloat(element.lat),parseFloat(element.lng)));
        var markerLocation = {lat:parseFloat(element.lat), lng: parseFloat(element.lng)};
        var marker = new google.maps.Marker({
            position: markerLocation,
            map: window.upreal.map,
            icon: image,
            title:element.title,
            adrress:element.subtitle,
            price:window.upreal.format.to(parseInt(element.price)),
            photo:element.photo,
            bed:element.bed,
            bath:element.bath,
            sqft:element.sqft,
        });
        google.maps.event.addListener(marker,'mouseover',function(){
            window.upreal.createInfoWindow(element, marker);
        });
        google.maps.event.addListener(marker,'mouseout',function(){
            window.upreal.infoWindow.close();
        });
        google.maps.event.addListener(marker,'click',function(){
            browserHistory.push("/property/"+element.id);
        });

        window.upreal.markers.push(marker);}else return;
    });
         google.maps.event.addDomListener(window, 'load', window.upreal.map);
         //drawingManager.setMap(null);
  });
}
window.upreal.createMarkers = function(){
    console.log("map markers");

    window.upreal.clearMarkers();

    if(window.upreal.items.length == 0)
        return;

    var image = {
        url: "/assets/i/origin/map-marker.png",
        size: new google.maps.Size(50, 66),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 66)
    }; 
   
   
    window.upreal.items.forEach(function(element, index, array) {
        var markerLocation = {lat:parseFloat(element.lat), lng: parseFloat(element.lng)};
        var marker = new google.maps.Marker({
            position: markerLocation,
            map: window.upreal.map,
            icon: image,
            title:element.title,
            adrress:element.subtitle,
            price:window.upreal.format.to(parseInt(element.price)),
            photo:element.photo,
            bed:element.bed,
            bath:element.bath,
            sqft:element.sqft,
        });
        google.maps.event.addListener(marker,'mouseover',function(){
            window.upreal.createInfoWindow(element, marker);
        });
        google.maps.event.addListener(marker,'mouseout',function(){
            window.upreal.infoWindow.close();
        });
        google.maps.event.addListener(marker,'click',function(){
            browserHistory.push("/property/"+element.id);
        });

        window.upreal.markers.push(marker);
    });
    if(window.upreal.idle == false){
        window.upreal.idle = true;
        window.upreal.map.addListener('idle', function(){
            console.log("idle");
            var loc = browserHistory.getCurrentLocation();
            if(loc.pathname == "/properties"){
                var c = window.upreal.map.getCenter();
                loc.query.lng = c.lng();
                loc.query.lat = c.lat();
                browserHistory.push(loc);
                PropertiesStore.query_last = loc;
            }
        });
    }
   
        window.upreal.map.setCenter({
            lat: parseFloat(window.upreal.items[0].lat),
            lng: parseFloat(window.upreal.items[0].lng) - 0.015
        });
   
   var clusterOptions = [{
        url: '/assets/i/cluster-icon-google.png',
        anchor: [0,0],
        iconAnchor: [50, 66],
        height: '52',
        width: '52',
        textColor: '#fff',
        textSize: '14'
    }];
    var cluster_Options = {
    zoomOnClick: false
}
    var markerCluster = new MarkerClusterer(window.upreal.map, window.upreal.markers,cluster_Options);
    markerCluster.setStyles(clusterOptions);
    google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster) {
    	var content1="";
    	for(var i=0;i<cluster.getMarkers().length;i++){    	
    		content1 +='<div class="row">'+
    			'<div class="row_img">'+
    				'<img src="http://idsrealty-api.fgeekdemos.org'+cluster.getMarkers()[i]['photo']+ '"class="img" >'+
    			'</div>'+
    			'<div class="row_text">'+
    				'<p class="addr">'+cluster.getMarkers()[i]['adrress']+'</p>'+
    				'<p>$'+cluster.getMarkers()[i]['price']+'&nbsp;&nbsp;Beds: '+cluster.getMarkers()[i]['bed']+', Baths: '+cluster.getMarkers()[i]['bath']+', Sq Ft:'+cluster.getMarkers()[i]['sqft']+'</p>'+
    			'</div>'+
    		'</div>'
    	}
    	var content='<div class="listinfo">'+
    		content1+
    	'</div>'
    	console.log(content);
    	 window.upreal.infoWindow.setContent(content);
    	 window.upreal.infoWindow.setPosition(cluster.getCenter());
    window.upreal.infoWindow.open(window.upreal.map);
    google.maps.event.addListener(window.upreal.map, 'zoom_changed', function() {
        window.upreal.infoWindow.close()
    });
    })
    
}

window.upreal.createInfoWindow = function(item, marker){
    var props = 'Beds: '+item.bed+', Baths: '+item.bath+', Sq Ft:'+item.sqft;
    var contentString =
        '<div href="#" class="infowindow">' +
            '<div class="infowindow__image-wrap">' +
                '<img src="http://idsrealty-api.fgeekdemos.org' + item.photo + '" class="infowindow__image"/>' +
                '<span class="infowindow__price">$' + window.upreal.format.to(parseInt(item.price)) + '</span>' +
                '<span class="infowindow__price infowindow__price__sqft">$' + window.upreal.format.to(parseInt(parseInt(item.price)/parseInt(item.sqft))) + '/Sqft</span>' +
            '</div>' +
            '<div class="testtest">'+
	           
	            '<p class="infowindow__title">' + item.title + '</p>' +
	            '<p class="infowindow__address">' + item.subtitle + '</p>' +
	            '<p class="infowindow__props">' + props + '</p>' +
	            '<p class="infowindow__type">' + item.type_name + '</p>' +
	    '</div>'+
        '</div>';

    window.upreal.infoWindow.setContent(contentString);
    window.upreal.infoWindow.open(window.upreal.map, marker);

    var $gmStyle = $('.gm-style-iw'); //infowindow wrapper
    $gmStyle.prev().remove(); //remove arrow
    $gmStyle.next().css({top: '39px', right: '31px'}); //move close icon
    $gmStyle.css({top: '35px', left: '25px', overflow: 'visible'}); // move wrapper
    $gmStyle.children().css('overflow', 'visible'); //set overflow to show shadow-box
    $gmStyle.children().children().css('overflow', 'visible');
}

window.upreal.detailMarker = function(){

    if(window.upreal.item.lat == 0)
        return;

    console.log("map detail marker");

    if(window.upreal.items.length == 0){
        var markerLocation = {
            lat:parseFloat(window.upreal.item.lat),
            lng: parseFloat(window.upreal.item.lng)
        };
        var marker = new google.maps.Marker({
            position: markerLocation,
            map: window.upreal.map,
            icon: "/assets/i/origin/map-marker.png"
        });
        google.maps.event.addListener(marker,'mouseover',function(){
            window.upreal.createInfoWindow(window.upreal.item, marker);
        });
        google.maps.event.addListener(marker,'mouseout',function(){
            window.upreal.infoWindow.close();
        });
        window.upreal.markers.push(marker);
    }
    if(window.upreal.map != false){
        window.upreal.map.setCenter({
            lat: parseFloat(window.upreal.item.lat),
            lng: parseFloat(window.upreal.item.lng) - 0.005
        });
    }
}
export const MapGoogle = React.createClass({
  getInitialState() {
        return {
            method: "marker"
        }
    },
    componentDidMount() {
        MapStore.bind(MapStore.events.map.updated, this.mapUpdated);
         //MapStore.bind(MapStore.events.map.updated, this.mapUpdated1);
        PropertiesStore.bind(PropertiesStore.events.items.update, this.propertiesUpdated);
        PropertyStore.bind(PropertyStore.events.item.update, this.propertyUpdated);

        window.upreal.items = PropertiesStore.items;
        window.upreal.item = PropertyStore.item;

        this.mapUpdated();
    },
    componentWillUnmount() {
        MapStore.unbind(MapStore.events.map.updated, this.mapUpdated);
        PropertiesStore.unbind(PropertiesStore.events.items.update, this.propertiesUpdated);
        PropertyStore.unbind(PropertyStore.events.item.update, this.propertyUpdated);
    },
    shouldComponentUpdate(nextProps, nextState){
        return false;
    },
    mapUpdated(){
    	
        if(MapStore.visible){
            $(".map").show();
            if(window.upreal.map == false){
            window.upreal.init();
            	if(this.state.method=='marker'){
                
                window.upreal.createMarkers();
                }else if(this.state.method=='radius'){
                	window.upreal.circleMarkers();
                }
                window.upreal.detailMarker();
            }
        }else{
            $(".map").hide();
        }
    },
    mapUpdated1(){
    	
        if(MapStore.visible){
            $(".map").show();
            if(window.upreal.map == false){
            window.upreal.init();
            	
                
                	window.upreal.circleMarkers();
                
                window.upreal.detailMarker();
            }
        }else{
            $(".map").hide();
        }
    },
    propertiesUpdated(){
        if(JSON.stringify(window.upreal.items) != JSON.stringify(PropertiesStore.items)){
            window.upreal.item = { lat: 0 };
            window.upreal.items = PropertiesStore.items;
            window.upreal.createMarkers();
        }
    },
    propertyUpdated(){
        if(JSON.stringify(window.upreal.item) != JSON.stringify(PropertyStore.item)){
            window.upreal.item = PropertyStore.item;
            window.upreal.detailMarker();
        }
    },
    zoom(type){
        if(type == 'in'){
            var zoom = window.upreal.map.getZoom();
            console.log(zoom);
            zoom++;
            window.upreal.map.setZoom(zoom);
        }else{
            var zoom = window.upreal.map.getZoom();
            zoom--;
            window.upreal.map.setZoom(zoom);
        }
    },
    render() {
        console.log("render map");
        return (
            <div className="map">
                <div className="map__body" id="map"></div>
                <div className="map__btns">
                    <div className="map__zoom" onClick={ (e) => this.zoom('in') }>zoom in</div>
                    <div className="map__zoom" onClick={ (e) => this.zoom('out') }>zoom out</div>
                    
                </div>
            </div>
        );
    }
})
