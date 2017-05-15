import * as React from 'react';
import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';

export const SortPicker = React.createClass({
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
    setSort(type, order, name){
        ToolbarStore.sort = {
            type: type,
            order: order,
            name: name
        };
        ToolbarStore.trigger(ToolbarStore.events.data.update);
        ToolbarStore.trigger(ToolbarStore.events.all.hide);
    },
    toggle(event){
        event.stopPropagation();
        var v = this.state.visible;
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
                    <i className="fa fa-sort"></i>
                    <span>{this.props.sort.name}</span>
                </div>
                <div className={listClass}>
                    <span   onClick={ (event) => this.setSort("id", "desc", "Default Sort")}
                            className="toolbar__item">Default Sort</span>
                    <span   onClick={ (event) => this.setSort("date_sort", "desc", "Newest")}
                            className="toolbar__item">Newest</span>
                    <span   onClick={ (event) => this.setSort("date_sort", "asc", "Oldest")}
                            className="toolbar__item">Oldest</span>
                    <span   onClick={ (event) => this.setSort("price", "asc", "Price (low to high)")}
                            className="toolbar__item">Price (low to high)</span>
                    <span   onClick={ (event) => this.setSort("price", "desc", "Price (high to low)")}
                            className="toolbar__item">Price (high to low)</span>
                    <span   onClick={ (event) => this.setSort("sqft", "asc", "Area Sq Ft (low to high)")}
                            className="toolbar__item">Area Sq Ft (low to high)</span>
                    <span   onClick={ (event) => this.setSort("sqft", "desc", "Area Sq Ft (high to low)")}
                            className="toolbar__item">Area Sq Ft (high to low)</span>
                </div>
            </div>
        );
    }
})
