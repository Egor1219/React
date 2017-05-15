'use strict';
 
import React from 'react';
import FacebookLogin from 'react-facebook-login';
 
class Facebook extends React.Component {
  constructor(props) {
      super(props);
  };
 
  responseFacebook(response){
    console.log(response);
  };
 
  render() {
    return (
      <FacebookLogin
        appId="171044540069510"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    )
  }
}
 
export default Facebook;