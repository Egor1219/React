import * as React from 'react';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { UserStore } from '../../../stores/UserStore.jsx';
import { PopupStore } from '../../../stores/PopupStore.jsx';
import { FavoriteStore } from '../../../stores/FavoriteStore.jsx';

export const FavoriteList = React.createClass({
    getInitialState() {
        return {
            active: false,
            items: FavoriteStore.items
        };
    },
    componentDidMount() {
        this.dataUpdated();
        ToolbarStore.bind(ToolbarStore.events.all.hide, this.hide);
        FavoriteStore.bind(FavoriteStore.events.data.update, this.dataUpdated);
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.all.hide, this.hide);
        FavoriteStore.unbind(FavoriteStore.events.data.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            items: FavoriteStore.items
        });
    },
    hide(){
        this.setState({
            active: false
        });
    },
    handleToggle(event){
        event.stopPropagation();
        if(!UserStore.token){
            PopupStore.show("auth");
            ToolbarStore.trigger(ToolbarStore.events.all.hide);
        }else{
            var v = this.state.active;
            ToolbarStore.trigger(ToolbarStore.events.all.hide);
            this.setState({active: !v});
        }
    },
    render() {
        var btnClass = "toolbar__btn"
        var listClass = "toolbar__list";
        if(this.state.active){
            btnClass += " toolbar__btn_active";
            listClass += " toolbar__list_active";
        }

        var items = this.state.items.map(function(item) {
            var span = "";
            if(parseInt(item.id)==0){
                span = <span
                    key={item.id}
                    onClick={(e)=>PopupStore.show("favorite")}
                    className="toolbar__item">
                    <div className="toolbar__count">{item.count}</div>
                    <div>{item.name}</div>
                </span>
            }else{
                span = <span
                    key={item.id}
                    onClick={(e) => FavoriteStore.getProperties(item.id)}
                    className="toolbar__item">
                    <div className="toolbar__count">{item.count}</div>
                    <div>{item.name}</div>
                </span>
            }
            return span;
        })
        return (
            <div className="toolbar__block">
                <div className={btnClass + " toolbar__block"}>
                    <i className="fa fa-heart-o" onClick={this.handleToggle}></i>
                </div>
                <div className={listClass}>
                    {items}
                </div>
            </div>
        );
    }
})
