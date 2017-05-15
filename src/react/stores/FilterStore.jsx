import { browserHistory } from 'react-router'

export const FilterStore = {
    properties(properties, filter){
        var items = properties.filter(function(property) {
            return  parseInt(property.price) > parseInt(filter.price[0]) &&
                    parseInt(property.price) < parseInt(filter.price[1]) &&
                    parseInt(property.sqft) > parseInt(filter.sqft[0]) &&
                    parseInt(property.sqft) < parseInt(filter.sqft[1]);
        });
        if(parseInt(filter.type)!=0){
            items = items.filter(function(property) {
                return  parseInt(property.type_id) == parseInt(filter.type)
            });
        }
        return items;
    }
}
MicroEvent.mixin( FilterStore );
