import * as React from 'react';

import { PopupStore } from '../../../stores/PopupStore.jsx';

export const CreateReport = React.createClass({
    getInitialState() {
        return {
            text: "",
        };
    },
    componentDidMount() {
        PopupStore.bind(PopupStore.events.report.show, this.popupShow);
        PopupStore.bind(PopupStore.events.all.hide, this.popupHide);
    },
    componentWillUnmount() {
        PopupStore.unbind(PopupStore.events.report.show, this.popupShow);
        PopupStore.unbind(PopupStore.events.all.hide, this.popupHide);
    },
    popupShow(){
        $('.popup_report').fadeIn(600);
    },
    popupHide(){
        $('.popup_report').fadeOut(300);
    },
    handleSubmit(e){
        e.preventDefault();
        var errors = 0;
        if(this.state.text.trim()=="")
            return;


        if(errors==0){

            $.ajax({
                url: 'http://upreal-api.develop.redlg.ru/report/add/',
                type: 'POST',
                data: {
                    text: this.state.text,
                    property_id: PopupStore.data.report.property_id,
                }
            })
            .done(function(result) {
                PopupStore.hide();
                this.setState({
                    text: ""
                });
            }.bind(this));
        }
    },
    handleChange(e){
        this.setState({
            text: e.target.value
        });
    },
    render() {
        return (
            <div className="popup popup_report">
            	<span className="popup__close" onClick={(e) => PopupStore.hide()}></span>
            	<div className="popup__title">Please describe the problem about listing:</div>
            	<div className="popup__social">
            		<form method="post" onSubmit={this.handleSubmit}>
                        <textarea className="popup__textarea" onChange={this.handleChange}></textarea>
            			<div className="popup__buttons">
            				<input className="popup__add-button" type="submit" value="Create"/>
            				<span className="popup__cancel-button" onClick={(e) => PopupStore.hide()}>Cancel</span>
            			</div>
            		</form>
            	</div>
            </div>
        );
    }
});
