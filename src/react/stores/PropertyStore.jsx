import { browserHistory } from 'react-router';

import { UserStore } from './UserStore.jsx';

export const PropertyStore = {
    events: {
        item: {
            update: "updateDetailInfo"
        }
    },
    selected: 0,
    view: "big",
    switchView(){
        if(PropertyStore.view == 'big')
            PropertyStore.view = 'small';
        else
            PropertyStore.view = 'big';
        PropertyStore.trigger(PropertyStore.events.item.update);
    },
    setView(view){
        PropertyStore.view = view;
        PropertyStore.trigger(PropertyStore.events.item.update);
    },
    items: {}, //cache
    item: {
        id: 0,
        title: "Loading",
        subtitle: "Loading",
        price: "",
        bed: "0",
        bath: "0",
        sqft: "0",
        featured: "Y",
        date_create: "",
        date_update: "",
        map_coord_x: 0,
        map_coord_y: 0,
        youtube_id: "",
        iframe_tour: "",
        description: "",
        lat: 0,
        lng: 0,
        zipcode: "",
        photo: "",
        type: "",
        user: "",
        city: "",
        area: "",
        watch: "no",
        photos: [],
        attachments: [],
        features: [],
        agent: {
            id: 0,
            address: "",
            name: "",
            phone: "",
            phones: "",
            city: ""
        }
    },
    getById(id) {
        PropertyStore.selected = id;
        if(PropertyStore.items[id]){
            PropertyStore.item = PropertyStore.items[id];
        }
        PropertyStore.trigger(PropertyStore.events.item.update);
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/property/',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id,
                token: UserStore.token
            }
        })
        .done(function(result) {
            PropertyStore.items[PropertyStore.selected] = result.item;
            PropertyStore.item = result.item;
            PropertyStore.trigger(PropertyStore.events.item.update);
        });

    },
    getDefault(){
        return {
            id: 0,
            title: "Loading",
            subtitle: "Loading",
            price: "",
            bed: "0",
            bath: "0",
            sqft: "0",
            featured: "N",
            date_create: "",
            date_update: "",
            lat: 0,
            lng: 0,
            youtube_id: "",
            iframe_tour: "",
            description: "",
            coord_x: "",
            coord_y: "",
            zipcode: "",
            photo: "",
            type: "",
            user: "",
            city: "",
            area: "",
            photos: [],
            attachments: [],
            features: [],
            watch: "no",
            agent: {
                id: 0,
                address: "",
                name: "",
                phone: "",
                phones: "",
                city: ""
            }
        };
    },
}
MicroEvent.mixin(PropertyStore);
