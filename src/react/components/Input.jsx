import * as React from 'react';

export const Input = React.createClass({
    getInitialState() {
        return {
            value: ""
        };
    },
    valueChange(e){
        if(this.props.value){
            this.props.onChange(e.target.value);
        }else{
            this.props.onChange(e.target.value);
            this.setState({
                value: e.target.value
            });
        }
    },
    componentDidMount() {
    },
    componentWillUnmount() {
    },
    popupHide(){
        PopupStore.trigger(PopupStore.events.all.hide);
    },
    itemSelect(e, item){
        this.props.onSelect(item);
    },
    render() {
        var type = (this.props.type) ? this.props.type : "text",
            className = (this.props.className) ? this.props.className : "",
            value = (this.props.value || this.props.value=="") ? this.props.value : this.state.value,
            placeholder = (this.props.placeholder) ? this.props.placeholder : "";


        var autocomplete = "";
        if(this.props.autocomplete){
            if(this.props.autocomplete.length > 0){
                var autocompleteItems = this.props.autocomplete.map(function(item) {
                    return <div key={item} className="izica-autocomplete__item" onClick={(event)=>this.itemSelect(event, item)}>{item}</div>;
                }.bind(this))
                autocomplete = <div className="izica-autocomplete">{autocompleteItems}</div>
            }
        }

        return (
            <div className={this.props.container} style={{position: "relative"}}>
                <input className={className} type={type} value={value} placeholder={placeholder} onChange={this.valueChange}/>
                {autocomplete}
            </div>
        );
    }
});
