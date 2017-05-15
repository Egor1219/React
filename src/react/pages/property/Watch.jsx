import * as React from 'react';

import { PropertyStore } from '../../stores/PropertyStore.jsx';
import { UserStore } from '../../stores/UserStore.jsx';
import { PopupStore } from '../../stores/PopupStore.jsx';

export const Watch = React.createClass({
    getInitialState() {
        return {
            item: PropertyStore.item,
        };
    },
    componentDidMount() {
        this.dataUpdated();
        PropertyStore.bind(PropertyStore.events.item.update, this.dataUpdated);
    },
    componentWillUnmount() {
        PropertyStore.unbind(PropertyStore.events.item.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            item: PropertyStore.item
        });
    },
    handleSwitch(e){
        if(!UserStore.token){
            PopupStore.show('auth');
            return;
        }
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/watch/toggle',
            type: 'POST',
            dataType: 'json',
            data: {
                property_id: this.state.item.id,
                token: UserStore.token
            }
        })
        .done(function(result) {
            PropertyStore.item.watch = result.watch;
            PropertyStore.trigger(PropertyStore.events.item.update);
        });
    },
    render() {
        var watchClass = "toolbar__block toolbar__tab";
        if(this.state.item.watch == "yes"){
            watchClass = "toolbar__block toolbar__tab toolbar__tab_red";
        }
        return(

            <div className={watchClass} onClick={this.handleSwitch}>
                <i className="fa fa-eye"></i>
            </div>
        )
    }
})
