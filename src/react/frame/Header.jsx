import * as React from 'react';
import { Link } from 'react-router';

import { UserStore } from '../stores/UserStore.jsx';
import { PopupStore } from '../stores/PopupStore.jsx';

export const Header = React.createClass({
    getInitialState() {
        return {
            username: UserStore.username
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
            username: UserStore.username
        });
    },
    popupShow(){
        PopupStore.show("auth");
    },
    render() {
        var btn = "";
        if(!this.state.username){
            btn = <div className="header__profile" onClick={this.popupShow}>Login/Register</div>;
        }else{
            btn = <Link to="/profile" className="header__profile">{this.state.username}</Link>;
        }
        return (
            <div className="header">
        		<header className="header__wrap">
        			<Link to="/" className="header__logo" title="National Investment Development Service"></Link>
        			<nav className="header__menu">
        				<Link to="/" className="header__item">Home</Link>
                        <Link to="/membership" className="header__item">Membership</Link>
                        <Link to="/about" className="header__item">About us</Link>
                        <Link to="/contact" className="header__item">Contact us</Link>
                        <Link to="/realto" className="header__item">Realto Log-in</Link>
        			</nav>
        			{btn}
        		</header>
        	</div>
        );
    }
});
