import { browserHistory } from 'react-router'

export const ToolbarStore = {
    events:{
        all:{
            hide: "toolbarHideAllElements"
        },
        data: {
            update: "toolbarDataUpdate"
        },
        filter: {
            changed: "filterChanged"
        }
    },
    type: "list",
    sort1:{
    	name:'sale'
    },
    sort: {
        name: "Default Sort",
        type: "id",
        order: "desc"
    },
    search:"",
    data:{
        sqft: [0, 50000],
        price: [0, 4200000],
        types:[
            {id: 0, name: "All Types"}
        ],
    },
    filter: {
        sqft: [0, 50000],
        price: [0, 4200000],
        type: 0,
    },
    select(prop, value){
        ToolbarStore.filter[prop] = value;
        ToolbarStore.trigger(ToolbarStore.events.data.update);
    },
    range(prop, value){
        if(ToolbarStore.data[prop].length==2){
            ToolbarStore.filter[prop] = [parseInt(value[0]), parseInt(value[1])];
        }else{
            ToolbarStore.filter[prop] = [parseInt(value[0])];
        }
        ToolbarStore.trigger(ToolbarStore.events.filter.changed);
    },
}
MicroEvent.mixin( ToolbarStore );
