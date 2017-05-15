import * as React from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { SelectStore } from '../stores/SelectStore.jsx';

export const Select = React.createClass({
    getInitialState() {
        return({
            opened: false,
            search: "",
            searchFocused: false,
            selected: false
        })
    },
    componentDidMount() {
        window.addEventListener('click', this.selectHide, false);
        SelectStore.bind(SelectStore.events.all.hide, this.selectHide);
    },
    componentWillUnmount() {
        window.removeEventListener('click', this.selectHide, false);
        SelectStore.unbind(SelectStore.events.all.hide, this.selectHide);
    },
    selectHide(){
        if(this.state.searchFocused)
           return;
        this.setState({
           opened: false
        });
    },
    selectToggle(e){
        e.stopPropagation();
        var state = this.state.opened;
        SelectStore.trigger(SelectStore.events.all.hide);
        this.setState({
           opened: !state
        });
    },
    itemSelect(e, id){
        this.setState({
           opened: false
        });
        this.props.onSelect(id);
    },
    searchChange(e){
        this.setState({ search: e.target.value });
    },
    searchFocus(e){
        this.setState({ searchFocused: true });
        e.preventDefault();
        e.stopPropagation();
    },
    searchBlur(e){
        this.setState({ searchFocused: false });
    },
    render() {
        var className = (this.props.className) ? "izica-select "+className : "izica-select";
        if(this.state.opened)
            className = className + " izica-select__opened";

        var items = this.props.items;
        var searchBox = "";
        var value = this.props.items.filter(function(item){
            return parseInt(item.id) == parseInt(this.props.value)
        }.bind(this));
        value = value[0].name;

        if(this.props.search){
            searchBox = <div className="izica-select__searchbox">
                        <input type="text" value={this.state.search} onChange={this.searchChange} onFocus={this.searchFocus} onBlur={this.searchBlur}/>
                    </div>;

            items = items.filter(function(item){
                return item.name.toLowerCase().includes(this.state.search.toLowerCase())
            }.bind(this));
        }

        items = items.map(function(item) {
            var itemClass = (item.id == this.props.value) ? "izica-select__item selected" : "izica-select__item";
            return (
                <div className={itemClass} key={item.id} onClick={(event)=>this.itemSelect(event, item.id)}>
                    {item.name}
                </div>
            );
        }.bind(this));

        return (
            <div className={className}>
                <div className="izica-select__value" onClick={this.selectToggle}>{value}</div>
                <div className="izica-select__list">
                    {searchBox}
                    <div className="izica-select__menu" style={{height: (this.props.items.length>10) ? "250px" : "auto"}}>
                        <PerfectScrollbar>
                            {items}
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        );
    }
})
