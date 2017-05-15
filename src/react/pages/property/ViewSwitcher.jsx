import * as React from 'react';

import { PropertyStore } from '../../stores/PropertyStore.jsx';

export const ViewSwitcher = React.createClass({
    getInitialState() {
        return {
            type: PropertyStore.view,
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
            type: PropertyStore.view,
        });
    },
    render() {
        var watchClass = "toolbar__block toolbar__tab toolbar__tab_right";
        var iconClass = "fa fa-arrows-alt";
        if(this.state.type == "big"){
            iconClass = "fa fa-compress";
            watchClass = "toolbar__block toolbar__tab toolbar__tab_right toolbar__tab_red";
        }
        return(
            <div className={watchClass} onClick={PropertyStore.switchView}>
                <i className={iconClass}></i>
            </div>
        )
    }
})
