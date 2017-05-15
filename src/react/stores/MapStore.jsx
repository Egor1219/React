import { browserHistory } from 'react-router'

var wNumb = require('wnumb');

export const MapStore = {
    events:{
        map: {
            updated: "mapstoreupdated",
        },
        data:{
            update: "mapDataUpdate"
        },
    },
    visible: false,
    show(){
        MapStore.visible = true;
        MapStore.trigger(MapStore.events.map.updated);
    },
    hide(){
        MapStore.visible = false;
        MapStore.trigger(MapStore.events.map.updated);
    },
    init(container){
        if(MapStore.loaded)
            return;

        MapStore.format = wNumb({
        	decimals: 0,
        	thousand: ','
        });

        var mapLocation = {lat:40.001, lng: 40.520};
        var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}];
        var mapOptions = {
            zoom: MapStore.zoom,
            center: mapLocation,
            scrollwheel: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            styles : styles
        };
        MapStore.map = new google.maps.Map(container, mapOptions);
        MapStore.infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListenerOnce(MapStore.map,'idle',function(){
            if(!MapStore.loaded){
                var loc = browserHistory.getCurrentLocation();
                if(loc.query.lng && loc.query.lat){
                    var mapLocation = {
                        lat: parseFloat(loc.query.lat),
                        lng: parseFloat(loc.query.lng)
                    };
                    MapStore.map.setCenter(mapLocation);
                }else{
                    var c = MapStore.map.getCenter();
                    var loc = browserHistory.getCurrentLocation();
                    loc.query.lng = c.lng();
                    loc.query.lat = c.lat();
                    browserHistory.push(loc);
                }
                MapStore.loaded = true;
            }
        });
        MapStore.map.addListener('dragend', function() {
            var c = MapStore.map.getCenter();
            var loc = browserHistory.getCurrentLocation();
            loc.query.lng = c.lng();
            loc.query.lat = c.lat();
            browserHistory.push(loc);
        });
    },
    zoomIn(){
        MapStore.zoom++;
        MapStore.map.setZoom(MapStore.zoom);
    },
    zoomOut(){
        MapStore.zoom--;
        MapStore.map.setZoom(MapStore.zoom);
    },
    clearMarkers(){
        for (var i = 0; i < MapStore.markers.length; i++) {
            MapStore.markers[i].setMap(null);
        }
        MapStore.markers = [];
    },
    compareMarkers(items){

    },
    createMarkers(item, items){
        if(items.length==0){ //проверяем поиск это или директ заход
            var mapLocation = {lat:parseFloat(item.lat), lng: parseFloat(item.lng)};
            var marker = new google.maps.Marker({
                position: mapLocation,
                map: MapStore.map,
                icon: "/assets/i/origin/map-marker.png"
            });
            MapStore.markers.push(marker);
        }else{
            if(MapStore.markers.length!=items.length){
                MapStore.clearMarkers();
            }
            items.forEach(function(element, index, array) {
                var markerLocation = {lat:parseFloat(element.lat), lng: parseFloat(element.lng)};
                var marker = new google.maps.Marker({
                    position:markerLocation,
                    map: MapStore.map,
                    icon: "/assets/i/origin/map-marker.png"
                });
                google.maps.event.addListener(marker,'mouseover',function(){
                    MapStore.createInfoWindow(element, marker);
                });
                google.maps.event.addListener(marker,'mouseout',function(){
                    MapStore.infoWindow.close();
                });
                google.maps.event.addListener(marker,'click',function(){
                    browserHistory.push("/property/"+element.id);
                });
                MapStore.markers.push(marker);
            });
        }
        var clusterOptions = [{
            url: '/assets/i/cluster-icon.png',
            anchor: [18,0],
            iconAnchor: [50, 66],
            height: '84',
            width: '50',
            textColor: '#fff',
            textSize: '14'
        }];
        var markerCluster = new MarkerClusterer(MapStore.map, MapStore.markers);
        markerCluster.setStyles(clusterOptions);

    },
    setCenter(item, items){
         if(item.id==0 && items.length>0){
            var mapLocation = {lat:parseFloat(items[0].lat), lng: parseFloat(items[0].lng)-0.035};
            MapStore.map.setCenter(mapLocation);
        }

        if(item.id!=0){
            var mapLocation = {lat:parseFloat(item.lat), lng: parseFloat(item.lng)-0.035};
            MapStore.map.setCenter(mapLocation);
        }
    },
    createInfoWindow(item, marker){
        var props = 'Beds: '+item.bed+', Baths: '+item.bath+', Sq Ft:'+item.sqft;
        var contentString =
            '<div href="#" class="infowindow">' +
                '<div class="infowindow__image-wrap">' +
                    '<img src="http://idsrealty-api.fgeekdemos.org' + item.photo + '" class="infowindow__image"/>' +
                    '<span class="infowindow__price">$' + MapStore.format.to(parseInt(item.price)) + '</span>' +
                    '<span class="infowindow__price infowindow__price__sqft">$' + MapStore.format.to(parseInt(parseInt(item.price)/parseInt(item.sqft))) + '/Sqft</span>' +
                '</div>' +
                '<div class="infowindow__title">' + item.title + '</div>' +
                '<div class="infowindow__address">' + item.subtitle + '</div>' +
                '<div class="infowindow__props">' + props + '</div>' +
                '<div class="infowindow__type">' + item.type_name + '</div>' +
            '</div>';

        MapStore.infoWindow.setContent(contentString);
        MapStore.infoWindow.open(MapStore.map, marker);

        var $gmStyle = $('.gm-style-iw'); //infowindow wrapper
        $gmStyle.prev().remove(); //remove arrow
        $gmStyle.next().css({top: '39px', right: '31px'}); //move close icon
        $gmStyle.css({top: '35px', left: '25px', overflow: 'visible'}); // move wrapper
        $gmStyle.children().css('overflow', 'visible'); //set overflow to show shadow-box
        $gmStyle.children().children().css('overflow', 'visible');
    }
}
MicroEvent.mixin( MapStore );
