import * as React from 'react';
import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';

export const ViewPicker = React.createClass({
    getInitialState() {
        return {
            active: false
        };
    },
    componentDidMount() {
        ToolbarStore.bind(ToolbarStore.events.all.hide, this.hide);
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.all.hide, this.hide);
    },
    hide(){
        this.setState({
            active: false
        });
    },
    setView(type){
        ToolbarStore.type = type;
        ToolbarStore.trigger(ToolbarStore.events.data.update);
        ToolbarStore.trigger(ToolbarStore.events.all.hide);
    },
    toggle(event){
         event.stopPropagation();
         var v = this.state.active;
         ToolbarStore.trigger(ToolbarStore.events.all.hide);
         this.setState({active: !v});
    },
    render() {
        var btnClass = "toolbar__button"
        var listClass = "toolbar__list";
        if(this.state.active){
            btnClass += " toolbar__button_active";
            listClass += " toolbar__list_active";
        }
        return (
            <div className="toolbar__block">
                <div className={btnClass} onClick={this.toggle}>
                    <i className="fa fa-eye"></i>
                    <span>Type view</span>
                </div>
                <div className={listClass}>
                    <div
                        onClick={ (event) => this.setView("map")}
                        className={(this.props.type=="map") ? "toolbar__item  toolbar__item_active" : "toolbar__item"}>
                        <i className="fa fa-map"></i>
                        <span>Map view</span>
                    </div>
                    <div
                        onClick={(event) => this.setView("list")}
                        className={(this.props.type=="list") ? "toolbar__item  toolbar__item_active" : "toolbar__item"}>
                        <i className="fa fa-list"></i>
                        <span>List view</span>
                    </div>
                    <div
                        onClick={(event) => this.setView("grid")}
                        className={(this.props.type=="grid") ? "toolbar__item  toolbar__item_active" : "toolbar__item"}>
                        <i className="fa fa-th"></i>
                        <span>Grid view</span>
                    </div>
                    <div
                        onClick={(event) => this.setView("list_map")}
                        className={(this.props.type=="list_map") ? "toolbar__item  toolbar__item_active" : "toolbar__item"}>
                        <i className="fa fa-map-marker"></i>
                        <span>List/map view</span>
                    </div>
                </div>
            </div>
        );
    }
})
