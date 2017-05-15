import * as React from 'react';

import { PopupStore } from '../../../stores/PopupStore.jsx';
import { FavoriteStore } from '../../../stores/FavoriteStore.jsx';

import { Input } from '../../../components/Input.jsx';
import { Select } from '../../../components/Select.jsx';

export const AddToFavoriteList = React.createClass({
    getInitialState() {
        return {
            items: FavoriteStore.items,
            item: FavoriteStore.add.favorite_id
        };
    },
    componentDidMount() {
        PopupStore.bind(PopupStore.events.addtofavorite.show, this.popupShow);
        PopupStore.bind(PopupStore.events.all.hide, this.popupHide);
        FavoriteStore.bind(FavoriteStore.events.data.update, this.dataUpdated);
        this.dataUpdated();

    },
    componentWillUnmount() {
        PopupStore.unbind(PopupStore.events.addtofavorite.show, this.popupShow);
        PopupStore.unbind(PopupStore.events.all.hide, this.popupHide);
        FavoriteStore.unbind(FavoriteStore.events.data.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            items: FavoriteStore.items,
            item: FavoriteStore.add.favorite_id
        });
    },
    popupShow(){
        $('.popup_favorite_add').fadeIn(600);
    },
    popupHide(){
        $('.popup_favorite_add').fadeOut(300);
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
        if(parseInt(this.state.item)==0)
            if(FavoriteStore.add.favorite_name.trim()==""){
                this.wrong($('.popup__input-favoritelistname'));
                errors++;
            }

        if(errors==0){
            FavoriteStore.addProperty();
            PopupStore.hide();
        }
    },
    render() {
        var input = "";
        if(parseInt(this.state.item)==0)
            input = <Input  className="popup__input popup__input-favoritelistname"
                    type="text"
                    placeholder="Name of Favorite list"
                    onChange={ (value) => {
                        FavoriteStore.add.favorite_name = value;
                    }}/>;

        return (
            <div className="popup popup_favorite_add">
            	<span className="popup__close" onClick={(e) => PopupStore.hide()}></span>
            	<div className="popup__title">Add Property to Favorite list</div>
            	<div className="popup__social">
            		<form method="post" onSubmit={this.handleSubmit}>
                        <Select items={this.state.items}
                                value={this.state.item}
                                onSelect={(value) => {
                                    FavoriteStore.add.favorite_id = value;
                                    FavoriteStore.trigger(FavoriteStore.events.data.update);
                                }}/>
                        {input}
            			<div className="popup__buttons">
            				<input className="popup__add-button" type="submit" value="Add"/>
            				<span className="popup__cancel-button" onClick={(e) => PopupStore.hide()}>Cancel</span>
            			</div>
            		</form>
            	</div>
            </div>
        );
    }
});
