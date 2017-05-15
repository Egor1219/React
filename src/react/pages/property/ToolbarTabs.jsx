import * as React from 'react';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

import { Watch } from './Watch.jsx';

export const ToolbarTabs = React.createClass({
    handleChange(name){
        this.props.onChange(name);
    },
    handlePrint(e){
        e.preventDefault();
        window.print();
    },
    facebookShare(){
        FB.ui({
            method: 'feed',
            name: this.props.item.title,
            link: window.location.href,
            picture: "http://idsrealty-api.fgeekdemos.org" + this.props.item.photo,
            caption: this.props.item.subtitle,
            description: this.props.item.city
        });
    },
    render() {
        const {
            FacebookShareButton,
            GooglePlusShareButton,
            TwitterShareButton,
        } = ShareButtons;
        console.log(this.props.item);
        return(
            <div className="toolbar__tabs">
                <div onClick={ (e) => this.handleChange('map') }
                    className={this.props.tab == "map" ? "toolbar__block toolbar__tab toolbar__tab_active" : "toolbar__block toolbar__tab"}>
                    <i className="fa fa-map-marker"></i>
                </div>
                <div onClick={ (e) => this.handleChange('satelite') }
                    className={this.props.tab == "satelite" ? "toolbar__block toolbar__tab toolbar__tab_active" : "toolbar__block toolbar__tab"}>
                    <i className="fa fa-building"></i>
                </div>
                <div onClick={ (e) => this.handleChange('slider') }
                    className={this.props.tab == "slider" ? "toolbar__block toolbar__tab toolbar__tab_active" : "toolbar__block toolbar__tab"}>
                    <i className="fa fa-picture-o"></i>
                </div>
                <div onClick={ (e) => this.handleChange('street') }
                    className={this.props.tab == "street" ? "toolbar__block toolbar__tab toolbar__tab_active" : "toolbar__block toolbar__tab"}>
                    <i className="fa fa-street-view"></i>
                </div>
                <Watch/>
                <div className="toolbar__block toolbar__tab" onClick={this.handlePrint}>
                    <i className="fa fa-print"></i>
                </div>
                <div className="toolbar__block toolbar__tab" onClick={this.facebookShare}>
                    <i className="fa fa-facebook-square"></i>
                </div>
                <GooglePlusShareButton
                    url={window.location.href}>
                    <div className="toolbar__block toolbar__tab">
                        <i className="fa fa-google-plus"></i>
                    </div>
                </GooglePlusShareButton>
                <TwitterShareButton
                    url={window.location.href}
                    title={this.props.item.title}>
                    <div className="toolbar__block toolbar__tab">
                        <i className="fa fa-twitter-square"></i>
                    </div>
                </TwitterShareButton>
            </div>
        )
    }
})
