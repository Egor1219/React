import { browserHistory } from 'react-router';

import { UserStore } from './UserStore.jsx';
import { PropertiesStore } from './PropertiesStore.jsx';

export const SavedSearchStore = {
    events:{
        data: {
            update: "SavedSearchStoreUpdate"
        }
    },
    items: [],
    name: "",
    add(){
        var loc = browserHistory.getCurrentLocation();
        var data = {
            token: UserStore.token,
            name: this.name,
            query: loc.query
        };
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/savedsearch/add/',
            type: 'POST',
            dataType: 'json',
            data: data
        })
        .done(function(response) {
            SavedSearchStore.getList();
        });
    },
    delete(id){
        var data = {
            token: UserStore.token,
            id: id
        };
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/savedsearch/delete/',
            type: 'POST',
            dataType: 'json',
            data: data
        })
        .done(function(response) {
            SavedSearchStore.getList();
        });
    },
    getList(){
        if(!UserStore.token)
            return;

        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/savedsearch/',
            type: 'POST',
            dataType: 'json',
            data: {
                token: UserStore.token
            }
        })
        .done(function(response) {
            if(response.status == "success"){
                SavedSearchStore.items = response.items;
                SavedSearchStore.trigger(SavedSearchStore.events.data.update);
            }
        });
    },
    search(item){
        var path = {
            pathname: '/properties',
            query: item.query,
        };
        browserHistory.push(path);
        PropertiesStore.getList(item.query);

    }
}
MicroEvent.mixin( SavedSearchStore );
