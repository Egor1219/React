import { browserHistory } from 'react-router';

import { SearchStore } from './SearchStore.jsx';
import { ToolbarStore } from './ToolbarStore.jsx';

export const PropertiesStore = {
    events:{
        items:{
            update: "propertieswasupdatesd"
        }
    },
    query_last: {},
    items: [],
    getList(params){
        this.query_last = params;
        var sqft_min = 9999999999;
        var sqft_max = 0;
        var price_min = 9999999999;
        var price_max = 0;
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/properties/',
            type: 'POST',
            dataType: 'json',
            data: params
        })
        .done(function(result) {
            result.items.forEach(function(item){
                if(sqft_min > parseInt(item.sqft))
                    sqft_min = parseInt(item.sqft);

                if(sqft_max < parseInt(item.sqft))
                    sqft_max = parseInt(item.sqft);

                if(price_min > parseInt(item.price))
                    price_min = parseInt(item.price);

                if(price_max < parseInt(item.price))
                    price_max = parseInt(item.price);
            });
            ToolbarStore.filter.sqft = [sqft_min-1, sqft_max+1];
            ToolbarStore.filter.price = [price_min-1, price_max+1];
            ToolbarStore.data.sqft = [sqft_min-1, sqft_max+1];
            ToolbarStore.data.price = [price_min-1, price_max+1];
            ToolbarStore.trigger(ToolbarStore.events.filter.changed);
            PropertiesStore.items = result.items;
            PropertiesStore.trigger(PropertiesStore.events.items.update);
        });
    }
}
MicroEvent.mixin( PropertiesStore );
