import * as React from 'react';

import { Slider } from './Slider.jsx';
import { Map } from './Map.jsx';
import { Satelite } from './Satelite.jsx';
import { Street } from './Street.jsx';

export const Tabs = React.createClass({
    shouldComponentUpdate(nextProps, nextState){
        if(this.props == nextProps && this.state == nextState)
            return false;
        return true;
    },
    render() {
        var view = <Slider/>;
        if(this.props.tab=="map"){
            view = <Map/>;
        }
        if(this.props.tab=="satelite"){
            view = <Satelite/>;
        }
        if(this.props.tab=="street"){
            view = <Street/>;
        }
        return(
            <div className="property-mini__tabs" id="preview">
                {view}
            </div>
        )
    }
})
