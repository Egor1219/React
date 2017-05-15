import React from 'react';

export default class FacebookButton extends React.Component {
   constructor(props) {
      super(props);

      this.FB = props.fb;

      this.state = {
         message: ""
      };

   }

   componentDidMount() {
      this.FB.Event.subscribe('auth.logout', 
         this.onLogout.bind(this));
      this.FB.Event.subscribe('auth.statusChange', 
         this.onStatusChange.bind(this));
   }
      
   onStatusChange(response) {
      console.log( response );
      var self = this;

      if( response.status === "connected" ) {
         this.FB.api('/me', function(response) {
            console.log(response);
         })
      }
   }

   onLogout(response) {
      this.setState({
         message: ""
      });
   }

   render() {
      return (
         <div>
            <div 
               className="fb-login-button" 
               data-max-rows="1" 
               data-size="small" 
               data-show-faces="false" 
               data-auto-logout-link="false"
               >
            </div>
            <div>{this.state.message}</div>
         </div>
      );
   }
};