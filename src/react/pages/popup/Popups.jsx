import * as React from 'react';

import { PopupStore } from '../../stores/PopupStore.jsx';

import { PopupAuthTemplate } from './auth/PopupAuthTemplate.jsx';
import { CreateFavoriteList } from './favorite/CreateFavoriteList.jsx';
import { AddToFavoriteList } from './favorite/AddToFavoriteList.jsx';
import { CreateReport } from './report/CreateReport.jsx';


export const Popups = React.createClass({
    getInitialState() {
        return {
            overlay: false
        };
    },
    componentDidMount() {
        PopupStore.bind(PopupStore.events.overlay.show, this.overlayShow);
        PopupStore.bind(PopupStore.events.all.hide, this.overlayHide);
    },
    componentWillUnmount() {
        PopupStore.unbind(PopupStore.events.overlay.show, this.overlayShow);
        PopupStore.unbind(PopupStore.events.all.hide, this.overlayHide);
    },
    overlayShow(){
        $('.overlay').fadeIn(300);
    },
    overlayHide(){
        $('.overlay').fadeOut(300);
    },
    render() {
        return (
            <div>
                <div className="overlay" onClick={(e)=>PopupStore.hide()}></div>
                <PopupAuthTemplate/>
                <CreateFavoriteList/>
                <AddToFavoriteList/>
                <CreateReport/>
            </div>
        );
    }
});
