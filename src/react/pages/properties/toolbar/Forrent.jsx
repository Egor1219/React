import * as React from 'react';
import { ToolbarStore } from '../../../stores/ToolbarStore.jsx';
import { browserHistory } from 'react-router';
export const Forrent = React.createClass({
    getInitialState() {
        return {
            active: false,
            status:'sale'
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
    handleSubmit1(e){
    this.setState({status:'sale'})
        e.preventDefault();
        e.stopPropagation();
        browserHistory.push("/properties?query="+"&status=sale"+"&type=residental");
    },
    handleSubmit(e){
   this.setState({status:'rent'})
        e.preventDefault();
        e.stopPropagation();
        browserHistory.push("/properties?query="+"&status=rent"+"&type=residental");
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
                    <span>{this.state.status}</span>
                </div>
                <div className={listClass}>
                    <span   onClick={ () => this.handleSubmit1()}
                            className="toolbar__item">For sale</span>
                    <span   onClick={ () => this.handleSubmit()}
                            className="toolbar__item">For rent</span>
                    
                </div>
            </div>
        );
    }
})