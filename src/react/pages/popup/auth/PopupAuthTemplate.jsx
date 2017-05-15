import * as React from 'react';
import { PopupStore } from '../../../stores/PopupStore.jsx';
import { Input } from '../../../components/Input.jsx';
import {FacebookButton} from '../../../components/FacebookButton.jsx';
import { Login } from './Login.jsx';
import { Register } from './Register.jsx';

export const PopupAuthTemplate = React.createClass({
    getInitialState() {
        return {
            tab: "login"
        }
    },
    componentDidMount() {
        PopupStore.bind(PopupStore.events.auth.show, this.popupShow);
        PopupStore.bind(PopupStore.events.all.hide, this.popupHide);
    },
    componentWillUnmount() {
        PopupStore.unbind(PopupStore.events.auth.show, this.popupShow);
        PopupStore.unbind(PopupStore.events.all.hide, this.popupHide);
    },
    popupShow(){
        $('.popup-auth').fadeIn(600);
    },
    popupHide(){
        $('.popup-auth').fadeOut(300);
    },
    render() {
        var tab = "";
        if(this.state.tab=="register"){
            tab = <Register/>;
        }else{
            tab = <Login/>;
        }
        return (
            <div className="popup-auth">
                <div className="popup-auth__header">
                    <span
                        className={(this.state.tab=="login") ? "popup-auth__header-tab popup-auth__header-tab_active" : "popup-auth__header-tab"}
                        onClick={(e) => this.setState({tab: "login"})}>
                        Login
                    </span>
                    <span
                        className={(this.state.tab=="register") ? "popup-auth__header-tab popup-auth__header-tab_active" : "popup-auth__header-tab"}
                        onClick={(e) => this.setState({tab: "register"})}>
                        Register
                    </span>
                    <span
                        className="popup-auth__close"
                        onClick={(e) => PopupStore.hide()}>
                    </span>
                </div>
                <div className="popup-auth__tabs">
                    {tab}
                </div>
            </div>
        );
    }
});
