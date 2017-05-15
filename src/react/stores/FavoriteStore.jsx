import { browserHistory } from 'react-router';

import { UserStore } from './UserStore.jsx';
import { PropertiesStore } from './PropertiesStore.jsx';

export const FavoriteStore = {
    events:{
        data: {
            update: "favoriteItemsUpdate"
        }
    },
    items: [{
        id: "0",
        name: "Add new",
        count: "+"
    }],
    create:{
        name: "", //for create
    },
    add: {
        favorite_id: 0,
        favorite_name: "",
        property_id: "",
    },
    createNew(){
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/favorite/add/',
            type: 'POST',
            dataType: 'json',
            data: {
                token: UserStore.token,
                favorite_id: 0,
                favorite_name: FavoriteStore.create.name
            }
        })
        .done(function(response) {
            FavoriteStore.getList();
        });
    },
    addProperty(){
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/favorite/add/',
            type: 'POST',
            dataType: 'json',
            data: {
                token: UserStore.token,
                favorite_id: FavoriteStore.add.favorite_id,
                favorite_name: FavoriteStore.add.favorite_name,
                property_id: FavoriteStore.add.property_id,
            }
        })
        .done(function(response) {
            FavoriteStore.getList();
        });
    },
    getList(){
        if(!UserStore.token)
            return;

        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/favorite/',
            type: 'POST',
            dataType: 'json',
            data: {
                token: UserStore.token
            }
        })
        .done(function(response) {
            FavoriteStore.items = response.items;
            FavoriteStore.items.unshift({
                id: "0",
                name: "Add new",
                count: "+"
            });
            FavoriteStore.trigger(FavoriteStore.events.data.update);
        });
    },
    getProperties(id){
        if(!UserStore.token)
            return;

        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/favorite/properties/',
            type: 'POST',
            dataType: 'json',
            data: {
                token: UserStore.token,
                favorite_id: id
            }
        })
        .done(function(response) {
            PropertiesStore.items = response.items;
            PropertiesStore.trigger(PropertiesStore.events.items.update);
        });
    },
}
MicroEvent.mixin( FavoriteStore );
