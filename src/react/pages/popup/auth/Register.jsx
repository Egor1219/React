import * as React from 'react';

import { UserStore } from '../../../stores/UserStore.jsx';

import { Input } from '../../../components/Input.jsx';

export const Register = React.createClass({
    getInitialState() {
        return {
            alert: UserStore.register.alert
        };
    },
    componentDidMount() {
        this.dataUpdated();
        UserStore.bind(UserStore.events.data.update, this.dataUpdated);
    },
    componentWillUnmount() {
        UserStore.unbind(UserStore.events.data.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            alert: UserStore.register.alert
        });
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
        if(UserStore.register.login.trim()==""){
            this.wrong($('.popup-auth__input-wrap_login'));
            errors++;
        }

        if(UserStore.register.password.trim()==""){
            this.wrong($('.popup-auth__input-wrap_pass'));
            errors++;
        }

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(UserStore.register.email.trim())){
            this.wrong($('.popup-auth__input-wrap_email'));
            errors++;
            UserStore.setAlert("register", "Invalid email");
        }

        if(errors==0){
            UserStore.actionRegister();
        }

    },
    render() {
        return (
            <form className="popup-auth__form popup-auth__form_active" onSubmit={this.handleSubmit}>
                <div className="popup-auth__inputs">
                    <div className="popup-auth__input-wrap">
                        <i className="fa fa-user"></i>
                        <Input  className="popup-auth__input"
                                type="text"
                                placeholder="Username"
                                onChange={ (value) => {
                                    UserStore.register.login = value;
                                }}/>
                    </div>
                    <div className="popup-auth__input-wrap">
                        <i className="fa fa-lock"></i>
                        <Input  className="popup-auth__input"
                                type="password"
                                placeholder="Password"
                                onChange={ (value) => {
                                    UserStore.register.password = value;
                                }}/>
                    </div>
                    <div className="popup-auth__input-wrap">
                        <i className="fa fa-envelope"></i>
                        <Input  className="popup-auth__input"
                                type="text"
                                placeholder="Email"
                                onChange={ (value) => {
                                    UserStore.register.email = value;
                                }}/>
                    </div>
                </div>
                <div className="popup-auth__alert">{this.state.alert}</div>
                <input className="popup-auth__input popup-auth__input_submit" type="submit" value="Register"/>
            </form>
        );
    }
});
