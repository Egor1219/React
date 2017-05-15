import { browserHistory } from 'react-router';

import { ToolbarStore } from './ToolbarStore.jsx';

export const SearchStore = {
    events:{
        data:{
            update: "searchDataUpdate"
        },
    },
    data:{
        subtitles:[],
        cities:[
            {id: 0, name: "All Provinces"}
        ],
        areas:[
            {id: 0, name: "All Cities"}
        ],
        types:[
            {id: 0, name: "All Types"}
        ],
        statuses:[
            {id: 0, name: "All Statuses"}
        ],
        features:[],
        bed: [
            {id: 0, name: "Any Beds"},
            {id: 1, name: "1 Bed"},
            {id: 2, name: "2 Beds"},
            {id: 3, name: "3 Beds"},
            {id: 4, name: "4 Beds"},
            {id: 5, name: "5 Beds"},
            {id: 6, name: "6 Beds"},
        ],
        bath: [
            {id: 0, name: "Any Baths"},
            {id: 1, name: "1 Bath"},
            {id: 2, name: "2 Baths"},
            {id: 3, name: "3 Baths"},
            {id: 4, name: "4 Baths"},
            {id: 5, name: "5 Baths"},
            {id: 6, name: "6 Baths"},
        ],
        sqft: [0, 7000],
        price: [0, 4200000],
    },
    selected:{
        subtitle: "",
        city: 0,
        area: 0,
        type: 0,
        status: 0,
        bed: 0,
        bath: 0,
        sqft: [0, 7000],
        price: [0, 4200000],
        features: []
    },
    select(prop, value){
        SearchStore.selected[prop] = value;
        if(prop == "city"){
            SearchStore.selected["area"] = 0;
            SearchStore.data["areas"] = [{id: 0, name: "All Areas"}];
            SearchStore.getAreas();
        }
        SearchStore.trigger(SearchStore.events.data.update);
    },
    range(prop, value){
        if(SearchStore.data[prop].length==2){
            SearchStore.selected[prop] = [parseInt(value[0]), parseInt(value[1])];
        }else{
            SearchStore.selected[prop] = [parseInt(value[0])];
        }
        SearchStore.trigger(SearchStore.events.data.update);
    },
    subtitle(value){
        SearchStore.selected['subtitle'] = value;
        SearchStore.trigger(SearchStore.events.data.update);
        if(value==""){
            SearchStore.data.subtitles = [];
            SearchStore.trigger(SearchStore.events.data.update);
            return;
        }
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/search/subtitle',
            type: 'POST',
            dataType: 'json',
            data:{
                subtitle: value
            }
        })
        .done(function(response) {
            SearchStore.data.subtitles = response.items;
            SearchStore.trigger(SearchStore.events.data.update);
        });
    },
    getData(){
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/search/',
            type: 'POST',
            dataType: 'json',
        })
        .done(function(response) {
            SearchStore.data.statuses = response.data.statuses;
            SearchStore.data.features = response.data.features;
            SearchStore.data.types = response.data.types;
            SearchStore.data.cities = response.data.cities;
            ToolbarStore.data.types = response.data.types;
            SearchStore.trigger(SearchStore.events.data.update);
        });
    },
    getAreas(){
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/search/areas/',
            type: 'POST',
            dataType: 'json',
            data: {
                city_id: SearchStore.selected.city
            }
        })
        .done(function(response) {
            SearchStore.data.areas = response.areas;
            SearchStore.trigger(SearchStore.events.data.update);
        });
    }
}
MicroEvent.mixin( SearchStore );
