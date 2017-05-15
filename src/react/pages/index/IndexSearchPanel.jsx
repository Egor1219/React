import * as React from 'react';
import Nouislider from 'react-nouislider';
import { Link } from 'react-router';

import { Input } from '../../components/Input.jsx'
import { Select } from '../../components/Select.jsx'

import { SearchStore } from '../../stores/SearchStore.jsx';
import { PropertiesStore } from '../../stores/PropertiesStore.jsx';

var wNumb = require('wnumb');

export const IndexSearchPanel = React.createClass({
    getInitialState() {
        return {
            data: SearchStore.data,
            selected: SearchStore.selected,
            features: false,
            properties: PropertiesStore.items,
            search: false
        };
    },
    componentDidMount() {
        this.setState({
            search: false
        });
        this.dataUpdated();
        SearchStore.bind(SearchStore.events.data.update, this.dataUpdated);
        PropertiesStore.bind(PropertiesStore.events.items.update, this.searchFinish);
        SearchStore.getData();
    },
    componentWillUnmount() {
        SearchStore.unbind(SearchStore.events.data.update, this.dataUpdated);
        PropertiesStore.unbind(PropertiesStore.events.items.update, this.searchFinish);
    },
    dataUpdated(){
        this.setState({
            data: SearchStore.data,
            selected: SearchStore.selected,
            properties: PropertiesStore.items,
        });
    },
    searchFinish(){
        this.setState({
            search: true,
            properties: PropertiesStore.items,
        });
    },
    featuresToggle(e){
        if(this.state.features){
            this.setState({
                features: false,
            });
            $(".mainpage-filter__features").fadeOut(300);
        }else{
            this.setState({
                features: true,
            });
            $(".mainpage-filter__features").fadeIn(300);
        }
    },
    featureToggle(e, feature_id){
        if(SearchStore.selected.features.includes(feature_id)){
            SearchStore.selected.features = SearchStore.selected.features.filter(function(item){
                return parseInt(item) != parseInt(feature_id)
            });
        }else{
            SearchStore.selected.features.push(feature_id);
        }
        SearchStore.trigger(SearchStore.events.data.update);
    },
    render() {
        var format = wNumb({
        	decimals: 0,
        	thousand: ','
        });

        var features = this.state.data.features.map(function(item) {
            var className = (SearchStore.selected.features.includes(item.id)) ? "mainpage-filter__feature mainpage-filter__feature_active" : "mainpage-filter__feature";
            return <div key={item.id} className={className} onClick={(event) => this.featureToggle(event, item.id)}>{item.name}</div>;
        }.bind(this));

        var searchResult = "";
        if(this.state.search){
            var link = (this.state.properties.length>0) ? <Link to="/properties">Show result</Link> : '';
            searchResult = <div className="mainpage-filter__results">
                <span>{this.state.properties.length} properties was found </span>
                {link}
            </div>
        }

        return (
            <form className="mainpage-filter" method="post" action="">
				<span className="mainpage-filter__title">Search</span>
				<div className="mainpage-filter__row">
                    <div className="mainpage-filter__item mainpage-filter__item_wide">
                        <Input  placeholder="Enter an address, town, street or zip"
                                value={this.state.selected.subtitle}
                                onChange={(value) => SearchStore.subtitle(value)}
                                onSelect={(value) => { this.state.data.subtitles = []; SearchStore.select("subtitle", value); }}
                                autocomplete={this.state.data.subtitles}
                            />
                    </div>
					<div className="mainpage-filter__item">
                        <Select items={this.state.data.cities}
                                value={this.state.selected.city}
                                onSelect={(value) => SearchStore.select("city", value)}
                                search/>
					</div>
					<div className="mainpage-filter__item">
                        <Select items={this.state.data.areas}
                                value={this.state.selected.area}
                                onSelect={(value) => SearchStore.select("area", value)}
                                search/>
					</div>
					<div className="mainpage-filter__item">
                        <Select items={this.state.data.types}
                                value={this.state.selected.type}
                                onSelect={(value) => SearchStore.select("type", value)}
                                search/>
					</div>
					<div className="mainpage-filter__item mainpage-filter__item_last">
                        <Select items={this.state.data.statuses}
                                value={this.state.selected.status}
                                onSelect={(value) => SearchStore.select("status", value)}
                                search/>
					</div>
				</div>
				<div className="mainpage-filter__row">
                    <div className="mainpage-filter__item">
                        <Select items={this.state.data.bed}
                                value={this.state.selected.bed}
                                onSelect={(value) => SearchStore.select("bed", value)}/>
                    </div>
                    <div className="mainpage-filter__item">
                        <Select items={this.state.data.bath}
                                value={this.state.selected.bath}
                                onSelect={(value) => SearchStore.select("bath", value)}/>
                    </div>
                    <div className="mainpage-filter__item mainpage-filter__item_range mainpage-filter__item_wide">
                        <div className="mainpage-filter__item-label">
                            Area(sqft):
                            <span> from {format.to(this.state.selected.sqft[0])} to {format.to(this.state.selected.sqft[1])}</span>
                        </div>
                        <Nouislider
                            range={{min: this.state.data.sqft[0], max: this.state.data.sqft[1]}}
                            start={this.state.selected.sqft}
                            step={1}
                            onSlide={(value) => SearchStore.range("sqft", value)}
                          />
                    </div>
                    <div className="mainpage-filter__item mainpage-filter__item_range mainpage-filter__item_wide mainpage-filter__item_last">
                        <div className="mainpage-filter__item-label">
                            Price Range:
                            <span> from ${format.to(this.state.selected.price[0])} to ${format.to(this.state.selected.price[1])}</span>
                        </div>
                        <Nouislider
                            range={{min: this.state.data.price[0], max: this.state.data.price[1]}}
                            start={this.state.selected.price}
                            step={1}
                            onSlide={(value) => SearchStore.range("price", value)}
                          />
                    </div>
				</div>
				<div className="mainpage-filter__row mainpage-filter__row_space">
					<span className={(this.state.features) ? "mainpage-filter__other mainpage-filter__other_opened" : "mainpage-filter__other"} onClick={this.featuresToggle}>Other features</span>
                    {searchResult}
                    <div className="mainpage-filter__search-button" onClick={PropertiesStore.getList}>
                        Search
                    </div>
				</div>
				<div className="mainpage-filter__features">
                    {features}
				</div>
			</form>
        );
    }
})
