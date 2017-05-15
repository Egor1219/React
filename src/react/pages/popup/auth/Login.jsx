import * as React from 'react';

import { UserStore } from '../../../stores/UserStore.jsx';
import { PopupStore} from '../../../stores/PopupStore.jsx';

import { Input } from '../../../components/Input.jsx';
import {FacebookLogin} from 'react-facebook-login';


import FacebookButton from '../../../components/FacebookButton.jsx';
import Facebook from '../../../components/Facebook.jsx';

export const Login = React.createClass({
    getInitialState() {
        return {
            checkbox: false,
            alert: UserStore.login.alert
        };
    },
    componentDidMount() {
    gapi.signin2.render('g-signin2', {
    'scope': 'profile email',
    'width': 36,
    'height': 35,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': this. onSignIn
  });
   
    	window.fbAsyncInit = function() {
    FB.init({
      appId      : '171044540069510',
      cookie     : true,  
      xfbml      : true, 
      version    : 'v2.8'
    });

   
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }.bind(this);

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
        this.dataUpdated();
        UserStore.bind(UserStore.events.data.update, this.dataUpdated);
    },
    
    testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
  console.log('Successful login for: ' + response.name);
  	  UserStore.username=response.name;
  	    UserStore.trigger(UserStore.events.data.update);
  	  PopupStore.hide();
  });
},
    
    statusChangeCallback(response) {
	  console.log('statusChangeCallback');
	  console.log(response);
	 
	  if (response.status === 'connected') {
	   
	    this.testAPI();
	  }
	},
    
    checkLoginState() {
	  FB.getLoginStatus(function(response) {
	    this.statusChangeCallback(response);
	  }.bind(this));
	},
	
    handleClick() {
	
	  FB.login(this.checkLoginState());
	},
    
    componentWillUnmount() {
        UserStore.unbind(UserStore.events.data.update, this.dataUpdated);
    },
    dataUpdated(){
        this.setState({
            alert: UserStore.login.alert
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
        if(UserStore.login.login.trim()==""){
            this.wrong($('.popup-auth__input-wrap_login'));
            errors++;
            alert();
        }

        if(UserStore.login.password.trim()==""){
            this.wrong($('.popup-auth__input-wrap_pass'));
            errors++;
        }

        if(errors==0){
            UserStore.actionLogin();
        }
    },
   
 onSignIn(googleUser) {
 
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  UserStore.username=profile.getName();
  	    UserStore.trigger(UserStore.events.data.update);
  	  PopupStore.hide();
},
  
  
  
   
    render() {
        return (
        <div className="popup-auth__form popup-auth__form_active">
            <form  onSubmit={this.handleSubmit}>
                <div className="popup-auth__inputs">
                    <div className="popup-auth__input-wrap">
                        <i className="fa fa-user"></i>
                        <Input  className="popup-auth__input"
                                type="text"
                                placeholder="Username"
                                onChange={ (value) => {
                                    UserStore.login.login = value;
                                }}/>
                    </div>
                    <div className="popup-auth__input-wrap">
                        <i className="fa fa-lock"></i>
                        <Input  className="popup-auth__input"
                                type="password"
                                placeholder="Password"
                                onChange={ (value) => {
                                    UserStore.login.password = value;
                                }}/>
                    </div>
                </div>
                <div className="popup-auth__alert">{this.state.alert}</div>
                <div className="popup-auth__row">
                    <div
                        onClick={(e) => this.setState({checkbox: !this.state.checkbox})}
                        className={(this.state.checkbox) ? "popup-auth__checkbox popup-auth__checkbox_checked" : "popup-auth__checkbox"}>
                        <i className="fa fa-square-o"></i>
                        <i className="fa fa-check-square-o"></i>
                        Remember me
                       
                    </div>
                    {/* <a href="#" className="popup-auth__link">Lost your password?</a> */}
                </div>
                <input className="popup-auth__input popup-auth__input_submit" type="submit" value="Login"/>
                
                <div className="social_login">
                	<span className="social">Or connect with:</span>
                	<img src={'../../../../assets/i/facebook.png'} alt="boohoo" className="facebook" onClick={this.handleClick}/>
                	<img src={'../../../../assets/i/google.png'}  className="google" onClick={this.handle1Click}/>
                	<div id="g-signin2" data-onsuccess={this.onSignIn}></div>
                </div>
               
            </form>
	                    
  </div>
        );
    }
});
