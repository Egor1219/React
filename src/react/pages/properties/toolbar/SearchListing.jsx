import * as React from 'react';
import { browserHistory } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { PropertiesStore } from '../../../stores/PropertiesStore.jsx';

export const SearchListing = React.createClass({
    getInitialState() {
        return {
            search: "",
            autocomplete: []
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
            autocomplete: []
        });
    },
    handleChange(e){
        var loc = browserHistory.getCurrentLocation();
        this.setState({
            search: e.target.value
        });
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/search/autocomplete/',
            type: 'POST',
            dataType: 'json',
            data: {
                query: e.target.value,
                status: loc.query.status,
                type: loc.query.type
            }
        })
        .done(function(result) {
            this.setState({
                autocomplete: result.items
            });
        }.bind(this));
    },
    search(value){
        var loc = browserHistory.getCurrentLocation();
        loc.query.query = value;
        browserHistory.push(loc);
        this.setState({
            search: value,
            autocomplete: []
        });
        PropertiesStore.items = [];
        PropertiesStore.trigger(PropertiesStore.events.items.update);
        PropertiesStore.getList(loc.query);
    },
    handleKeyPress(event){
        if(event.key == 'Enter'){
            this.search(this.state.search);
        }
    },
    render() {
        var listClass = "toolbar__field-autocomplete";
        if(this.state.autocomplete.length > 0)
            listClass += " toolbar__field-autocomplete_active";

        return (
            <div className="toolbar__field toolbar__block">
                <input value={this.state.search} type="text" placeholder="Search listings..." onFocus={this.handleChange} onKeyPress={this.handleKeyPress} onChange={this.handleChange}/>
                <i className="fa fa-search"></i>
                <div className={listClass}>
                    <PerfectScrollbar>
                        {this.state.autocomplete.map(function(item){
                            return(
                                <div key={item}
                                    onClick={ (e) => this.search(item) }
                                    className="toolbar__field-autocomplete__item">{item}</div>
                            );
                        }.bind(this))}
                    </PerfectScrollbar>
                </div>
            </div>
        );
    }
})
