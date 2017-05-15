import * as React from 'react';
import { browserHistory } from 'react-router';
import { Select } from '../../components/Select.jsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button ,ButtonToolbar } from 'react-bootstrap';
import { SearchStore } from '../../stores/SearchStore.jsx';
import Nouislider from 'react-nouislider';
var wNumb = require('wnumb');
export const IndexSearch = React.createClass({
    getInitialState() {
        return {
          data: SearchStore.data,
          selected: SearchStore.selected,
            dropdown: false,
             dropdown1: false,
            query: "",
            placeholder: "City, Neighborhood, Development, etc",
            type: 'residential',
            type1: 'house',
            status: 'sale',
            types: {
                all: 'All',
                commercial: 'Commercial',
                residential: 'Residential',
                multifamily:'Multi Family',
                recreational:'Recreational'
            },
            types1: {
                house: 'House',
                row_townhouse: 'Row/Townhouse',
                apartment: 'Apartment',
                duplex:'Duplex',
                triplex:'Triplex',
                fourplex:'Fourplex',
            },
            load: false,
            autocomplete: [],
        };
    },
    componentDidMount() {
        this.setState({
            dropdown: false,
            search: false
        });
        window.addEventListener('click', this.dropdownHide, false);
       
       // this.dataUpdated();
        SearchStore.bind(SearchStore.events.data.update, this.dataUpdated);
        //PropertiesStore.bind(PropertiesStore.events.items.update, this.searchFinish);
        SearchStore.getData();
    },
    componentWillUnmount() {
        window.removeEventListener('click', this.dropdownHide, false);
         SearchStore.unbind(SearchStore.events.data.update, this.dataUpdated);
    },
     dataUpdated(){
        this.setState({
            data: SearchStore.data,
            selected: SearchStore.selected,
           
        });
    },
    dropdownHide(){
        this.setState({
            dropdown: false
        });
    },
    handleSelect(type){
        this.setState({
            type: type,
            dropdown:false
        });
    },
    dropdownToggle(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            dropdown: !this.state.dropdown
        });
    },
    dropdownToggle1(e1){
        e1.preventDefault();
        e1.stopPropagation();
        this.setState({
            dropdown1: !this.state.dropdown
        });
    },
   handleSelect1(type1){
        this.setState({
            type1: type1,
            dropdown1:false
        });
    },
    handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        browserHistory.push("/properties?query="+this.state.query+"&status="+this.state.status+"&type="+this.state.type);
    },
    setQuery(value){
        this.setState({query: value})
        this.getAutocomplete(value);
    },
    getAutocomplete(query){
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/search/autocomplete/',
            type: 'POST',
            dataType: 'json',
            data: {
                query: query,
                status: this.state.status,
                type: this.state.type
            }
        })
        .done(function(result) {
            this.setState({autocomplete: result.items});
        }.bind(this));
    },
    render() {
    		var format = wNumb({
	        	decimals: 0,
	        	thousand: ','
       		 });
	    	var listClass = "index-search__autocomplete";
	        if(this.state.autocomplete.length > 0)
	         	 listClass += " index-search__autocomplete_active";
			        
        return (
       
           <form className="index-search" onSubmit={this.handleSubmit}>
                <div className="index-search__container">
                    
                    <div className="index-search__input">
                        <div className="index-search__tabs">
                            <div className={(this.state.status=='sale') ? "index-search__tab index-search__tab_active" : "index-search__tab"}
                                onClick={ (e) => this.setState({status: 'sale'})}>For Sale</div>
                            <div className={(this.state.status=='rent') ? "index-search__tab index-search__tab_active" : "index-search__tab"}
                                onClick={ (e) => this.setState({status: 'rent'})}>For Rent/Lease</div>
                           
                        </div>
                    </div>
                    <div className="location">
                    	<p>Location</p>
                        <input
                            placeholder={this.state.placeholder}
                            type="text"
                            onChange={ (e) => this.setQuery(e.target.value)}
                            value={this.state.query}/>
                        <div className={listClass} >
                            <PerfectScrollbar>
                                {this.state.autocomplete.map(function(item){
                                    return(
                                        <div key={item}
                                            onClick={(e) => this.setState({query: item, autocomplete: []})}
                                            className="index-search__autocomplete-item">{item}</div>
                                    );
                                }.bind(this))}
                            </PerfectScrollbar>
                        </div>
                     </div>
                        <div className="index-search__select">
                        	<p>Property Type</p>
	                        <div className="index-search__filter" onClick={this.dropdownToggle}>{this.state.types[this.state.type]}</div>
	                        <div className="index-search__list" style={{display: (this.state.dropdown) ? "block" : "none"}}>
	                            
	                            <div className="index-search__item" onClick={ (e) => this.handleSelect("residential") }>Residential</div>
	                            <div className="index-search__item" onClick={ (e) => this.handleSelect("commercial") }>Commercial</div>
	                            <div className="index-search__item" onClick={ (e) => this.handleSelect("recreational") }>Recreational</div>
	                            <div className="index-search__item" onClick={ (e) => this.handleSelect("commercial") }>Condo/Strata</div>
	                            <div className="index-search__item" onClick={ (e) => this.handleSelect("multifamily") }>Multi Family</div>
	                            <div className="index-search__item" onClick={ (e) => this.handleSelect("commercial") }>Vacant Land</div>
	                            <div className="index-search__item" onClick={ (e) => this.handleSelect("all") }>All</div>
	                        </div>
	                </div>
	                <div className="index-search__select1">
                        	<p>Building Type</p>
	                        <div className="index-search__filter1" onClick={this.dropdownToggle1}>{this.state.types1[this.state.type1]}</div>
	                        <div className="index-search__list1" style={{display: (this.state.dropdown1) ? "block" : "none"}}>
	                            
	                            <div className="index-search__item1" onClick={ (e1) => this.handleSelect1("house") }>House</div>
	                            <div className="index-search__item1" onClick={ (e1) => this.handleSelect1("row_townhouse") }>Row/Townhouse</div>
	                            <div className="index-search__item1" onClick={ (e1) => this.handleSelect1("apartment") }>Apartment</div>
	                            <div className="index-search__item1" onClick={ (e1) => this.handleSelect1("duplex") }>Duplex</div>
	                            <div className="index-search__item1" onClick={ (e1) => this.handleSelect1("triplex") }>Triplex</div>
	                            <div className="index-search__item1" onClick={ (e1) => this.handleSelect1("fourplex") }>Fourplex</div>
	                           
	                        </div>
	                </div>
	                <div className="price_slide">
	                        <div className="mainpage-filter__item-label">
	                            <p>Price</p> 
	                            <span>${format.to(this.state.selected.price[0])} to ${format.to(this.state.selected.price[1])}</span>
	                        </div>
	                        <Nouislider
	                            range={{min: this.state.data.price[0], max: this.state.data.price[1]}}
	                            start={this.state.selected.price}
	                            step={1}
	                            onSlide={(value) => SearchStore.range("price", value)}
	                          />
                    </div>
                    <div className="bed_slide">
	                         <p>Bedrooms</p> 
	                        <Select items={this.state.data.bed}
                                value={this.state.selected.bed}
                                onSelect={(value) => SearchStore.select("bed", value)}/>
                   
                    </div>
                    <div className="bath_slide">
                    		<p>Bathrooms</p> 
	                        <Select items={this.state.data.bath}
                                value={this.state.selected.bath}
                                onSelect={(value) => SearchStore.select("bath", value)}/>
                    </div>
                    <div className="area_slide">
	                        <div className="mainpage-filter__item-label">
	                            <p>Area</p> 
	                            <span>{format.to(this.state.selected.sqft[0])} to {format.to(this.state.selected.sqft[1])}</span>
	                        </div>
	                        <Nouislider
	                            range={{min: this.state.data.sqft[0], max: this.state.data.sqft[1]}}
	                            start={this.state.selected.sqft}
	                            step={1}
	                            onSlide={(value) => SearchStore.range("sqft", value)}
	                          />
                    </div>
                    <button type="submit" className="index-search__btn">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </form>
        );
    }
})
