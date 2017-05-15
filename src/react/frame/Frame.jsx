import * as React from 'react';

import { UserStore } from '../stores/UserStore.jsx';

import { Header } from './Header.jsx';
import { Popups } from '../pages/popup/Popups.jsx';
import { Footer } from './Footer.jsx';
import { MapGoogle } from './MapGoogle.jsx';

export const Frame = React.createClass({
    componentDidMount() {
        UserStore.init();
    },
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
                <MapGoogle/>
                <Footer/>
                <Popups/>
            </div>
        );
    }
})
