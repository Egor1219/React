import * as React from 'react';

import { SavedSearchStore } from '../../../stores/SavedSearchStore.jsx';
import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { UserStore } from '../../../stores/UserStore.jsx';
import { PopupStore } from '../../../stores/PopupStore.jsx';

export const SavedSearch = React.createClass({
    getInitialState() {
        return {
            items: [],
            name: SavedSearchStore.name,
            active: false,
            focus: false
        };
    },
    componentDidMount() {
        this.dataUpdated();
        ToolbarStore.bind(ToolbarStore.events.all.hide, this.hide);
        SavedSearchStore.bind(SavedSearchStore.events.data.update, this.dataUpdated);
        SavedSearchStore.getList();
    },
    componentWillUnmount() {
        ToolbarStore.unbind(ToolbarStore.events.all.hide, this.hide);
        SavedSearchStore.unbind(SavedSearchStore.events.data.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            items: SavedSearchStore.items,
            name: SavedSearchStore.name,
        });
    },
    hide(){
        if(!this.state.focus)
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
    handleFocus(e){
        e.preventDefault()
        e.stopPropagation();
        this.setState({
            focus: true
        });
    },
    handleBlur(e){
        e.preventDefault()
        e.stopPropagation();
        this.setState({
            focus: false
        });
        this.hide();
    },
    handleChange(e){
        SavedSearchStore.name = e.target.value;
        this.dataUpdated();
    },
    handleAdd(e){
        e.preventDefault()
        e.stopPropagation();
        this.setState({
            focus: true
        });
        if(SavedSearchStore.name.trim().length < 1)
            return;

        SavedSearchStore.add();
    },
    handleDelete(e, id){
        e.preventDefault()
        e.stopPropagation();
        this.setState({
            focus: true
        });
        SavedSearchStore.delete(id);
    },
    render() {
        var items = this.state.items.map(function(item){
            return (
                <span key={item.id} className="toolbar-savedsearch__item" onClick={ (e) => SavedSearchStore.search(item) }>
                    {item.name}
                    <i className="fa fa-trash" onClick={(e) => this.handleDelete(e, item.id)}></i>
                </span>
            );
        }.bind(this));

        var btnClass = "toolbar__button"
        var listClass = "toolbar__list";
        if(this.state.active){
            btnClass += " toolbar__button_active";
            listClass += " toolbar__list_active";
        }

        return (
            <div className="toolbar__block">
                <div className={btnClass}
                     onClick={this.handleToggle}>
                     <i className="fa fa-search-plus"></i>
                     <span>Saved Search</span>
                </div>
                <div className={listClass}>
                    <div className="toolbar-savedsearch">
                        <input type="text"
                            placeholder="Enter name for save"
                            value={this.state.name}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            onFocus={this.handleFocus}/>
                        <i className="fa fa-plus-circle" onClick={this.handleAdd}></i>
                    </div>
                    <div className="toolbar-savedsearch__list">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
})
