import { browserHistory } from 'react-router'

import { PopupStore } from './PopupStore.jsx';
import { FavoriteStore } from './FavoriteStore.jsx';

export const UserStore = {
    events:{
        data: {
            update: "userUpdated"
        }
    },
    login: {
        login: "",
        password: "",
        alert: "",
    },
    register: {
        login: "",
        password: "",
        email: "",
        alert: "",
    },
    token: $.cookie("token"),
    username: false,
    setAlert(obj, value){
        UserStore[obj].alert = value;
        UserStore.trigger(UserStore.events.data.update)
        setTimeout( function() {
            UserStore[obj].alert = "";
            UserStore.trigger(UserStore.events.data.update);
        } , 3000)
    },
    init(){
        if($.cookie("token")){
            this.token = $.cookie("token");
            $.ajax({
                url: 'http://idsrealty-api.fgeekdemos.org/user/check/',
                type: 'POST',
                dataType: 'json',
                data: {
                    token: UserStore.token,
                }
            })
            .done(function(result) {
                if(result.status == "success"){
                    UserStore.username = result.username;
                    UserStore.trigger(UserStore.events.data.update);
                    FavoriteStore.getList();
                }else{
                    UserStore.token = false;
                }
            })

        }else{
            this.token = false;
        }
    },
    actionLogin(){
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/user/login/',
            type: 'POST',
            dataType: 'json',
            data: {
                login: UserStore.login.login,
                password: UserStore.login.password,
            }
        })
        .done(function(result) {
            console.log(result);
            if(result.status == "success"){
                UserStore.token = result.token;
                UserStore.username = result.username;
                UserStore.trigger(UserStore.events.data.update);
                $.cookie('token', result.token, { expires: 7, path: '/' });
                PopupStore.hide();
                FavoriteStore.getList();
            }else{
                UserStore.setAlert("login", result.message);
            }
        })
    },
    actionRegister(){
    	
        $.ajax({
            url: 'http://idsrealty-api.fgeekdemos.org/user/register/',
            type: 'POST',
            dataType: 'json',
            data: {
                login: UserStore.register.login,
                password: UserStore.register.password,
                email: UserStore.register.email,
            }
        })
        .done(function(result) {
            if(result.status == "success"){
                UserStore.token = result.token;
                UserStore.username = result.username;
                UserStore.trigger(UserStore.events.data.update);
                PopupStore.hide();
                FavoriteStore.getList();
            }else{
                UserStore.setAlert("register", result.message);
            }
        })
    },
    // token(){
    //     return UserStore.token
    // },
}
MicroEvent.mixin( UserStore );
