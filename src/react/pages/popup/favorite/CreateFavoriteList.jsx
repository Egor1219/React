import * as React from 'react';

import { PopupStore } from '../../../stores/PopupStore.jsx';
import { FavoriteStore } from '../../../stores/FavoriteStore.jsx';

import { Input } from '../../../components/Input.jsx';
import { Select } from '../../../components/Select.jsx';

export const CreateFavoriteList = React.createClass({
    componentDidMount() {
        PopupStore.bind(PopupStore.events.favorite.show, this.popupShow);
        PopupStore.bind(PopupStore.events.all.hide, this.popupHide);
    },
    componentWillUnmount() {
        PopupStore.unbind(PopupStore.events.favorite.show, this.popupShow);
        PopupStore.unbind(PopupStore.events.all.hide, this.popupHide);
    },
    popupShow(){
        $('.popup_favorite').fadeIn(600);
    },
    popupHide(){
        $('.popup_favorite').fadeOut(300);
    },
    wrong(obj){
        obj.addClass('popup-auth__input-wrap_wrong');
        setTimeout( function() {
            obj.removeClass('popup-auth__input-wrap_wrong');
        } , 1000);
    },
    handleSubmit(e){
        e.preventDefault();
        var errors = 0;
        if(FavoriteStore.create.name.trim()==""){
            this.wrong($('.popup__input-favoritelistname'));
            errors++;
        }
        if(errors==0){
            FavoriteStore.createNew();
            PopupStore.hide();
        }
    },
    render() {
        return (
            <div className="popup popup_favorite">
            	<span className="popup__close" onClick={(e) => PopupStore.hide()}></span>
            	<div className="popup__title">Create new Favorite list</div>
            	<div className="popup__social">
            		<form method="post" onSubmit={this.handleSubmit}>
                        <Input  className="popup__input popup__input-favoritelistname"
                                type="text"
                                placeholder="Name of Favorite list"
                                onChange={ (value) => {
                                    FavoriteStore.create.name = value;
                                }}/>
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
