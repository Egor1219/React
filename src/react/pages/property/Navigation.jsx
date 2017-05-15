import * as React from 'react';
import { browserHistory, Link } from 'react-router';

import { PropertiesStore } from '../../stores/PropertiesStore.jsx';

export const Navigation = React.createClass({
    handleChange(index){
        if(index==-1){
            browserHistory.push("/property/"+this.props.items[this.props.items.length-1].id);
        } else if(index == this.props.items.length){
            browserHistory.push("/property/"+this.props.items[0].id);
        } else {
            browserHistory.push("/property/"+this.props.items[index].id);
        }
    },
    backToListing(e){
        browserHistory.push(PropertiesStore.query_last);
    },
    render() {
        var current = 0;
        var count = this.props.items.length;

        if(count == 0){
            return(
                <div className="toolbar-navigation toolbar__block">
                    <Link className="toolbar-navigation__arrow" to="/">
                        <i className="fa fa-chevron-left"></i>
                        <div className="toolbar-navigation__value" style={{width: '150px'}}>Back to mainpage</div>
                    </Link>
                </div>
            )
        }

        this.props.items.forEach(function(element, index){
            if(parseInt(this.props.item.id)==parseInt(element.id)){
                current = index;
            }
        }.bind(this));

        return (
            <div className="toolbar-navigation toolbar__block">
                <div className="toolbar-navigation__arrow" onClick={this.backToListing} style={{margin: '0px 5px 0px'}}>
                    <i className="fa fa-chevron-left"></i>
                    <div className="toolbar-navigation__value" style={{width: '150px'}}>Back to listing</div>
                </div>
                <div className="toolbar-navigation__arrow" onClick={ (e) => this.handleChange(current - 1)}>
                    <i className="fa fa-chevron-left"></i>
                </div>
                <div className="toolbar-navigation__value">{current+1}/{count}</div>
                <div className="toolbar-navigation__arrow" onClick={ (e) => this.handleChange(current + 1)}>
                    <i className="fa fa-chevron-right"></i>
                </div>

            </div>

        );
    }
})
