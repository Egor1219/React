import * as React from 'react';

import { browserHistory, Link } from 'react-router';

import { PropertiesStore } from '../../stores/PropertiesStore.jsx';

import { MapGoogleDetail } from './detail/MapGoogleDetail.jsx';
import { Panorama } from './detail/Panorama.jsx';
import { Aerial } from './detail/Aerial.jsx';
// import { Slider } from './detail/Slider.jsx';

var wNumb = require('wnumb');

export const Detail = React.createClass({
    getInitialState() {
        return {
            windowState: false,
            tabInteractive: "images",
            tabInfo: "features"
        };
    },
    componentDidMount() {
        this.setState({
            windowState: false,
            tabInteractive: "images",
            tabInfo: "features"
        });
    },
    componentWillUnmount() {

    },
    changeWindowState(){
        this.setState({
            windowState: !this.state.windowState
        });
    },
    dataUpdated(){
    },
    goBack(){
        if(PropertiesStore.items.length > 0){
            var loc = {
                pathname: "/properties",
                query: PropertiesStore.query_last
            };
            console.log(loc);
            browserHistory.push(loc);
        }else{
            browserHistory.push("/");
        }
    },
    render() {
        var format = wNumb({
        	decimals: 0,
        	thousand: ','
        });
        var current = 0;
        var count = this.props.items.length;
        this.props.items.forEach(function(element, index){
            if(parseInt(this.props.item.id)==parseInt(element.id)){
                current = index;
            }
        }.bind(this));

        var panelClassName = "detail detail_opened";
        if(this.state.windowState)
            panelClassName = panelClassName + " detail_fullscreen";

        var features = this.props.item.features.map(function(item) {
            return <div key={item.name} className="detail__feature">{item.name}</div>;
        });


        var navigationLeft = "";
        var navigationRight = "";
        if(PropertiesStore.items.length > 0){
            if(current==0){
                navigationLeft = <span
                    style={{visibility: "hidden" }}
                    className="controls__arrow"></span>
            }else{
                navigationLeft = <Link
                    to={"/property/"+this.props.items[current-1].id}
                    style={{visibility: "visible"}}
                    className="controls__arrow"></Link>;
            }

            if(current+1==count){
                navigationRight = <span
                    style={{visibility: "hidden" }}
                    className="controls__arrow controls__arrow_next"></span>
            }else{
                navigationRight = <Link
                    to={"/property/"+this.props.items[current+1].id}
                    style={{visibility: "visible"}}
                    className="controls__arrow controls__arrow_next"></Link>;
            }
        }

        return (
            <div className={panelClassName}>
				<div className="controls">
					<span onClick={this.goBack}
                        className="controls__back">{(PropertiesStore.items.length > 0) ? "Back to result" : "Back to Home page"}</span>
					<div className="controls__arrows" style={{display: (PropertiesStore.items.length > 0) ? "block" : "none"}}>
						{navigationLeft}
                        {current+1}/{count}
                        {navigationRight}
					</div>
					<span
                        onClick={this.changeWindowState}
                        className="controls__size"></span>
				</div>
				<div className="detail__topline">
					<span className="detail__title">{this.props.item.title}</span>
					<span className="detail__price">${format.to(parseInt(this.props.item.price))}</span>
				</div>
				<div className="detail__address">{this.props.item.subtitle}</div>
				<div className={(this.state.windowState) ? "detail__views detail__views_fullscreen" : "detail__views"}>
					<span
                        onClick={(event)=> this.setState({tabInteractive: "map_view"})}
                        className={(this.state.tabInteractive == "map_view") ? "detail__ico detail__ico_map-view detail__ico_active" : "detail__ico detail__ico_map-view"}>
                    </span>
                    <span
                        onClick={(event)=> this.setState({tabInteractive: "aerial"})}
                        className={(this.state.tabInteractive == "aerial") ? "detail__ico detail__ico_aerial detail__ico_active" : "detail__ico detail__ico_aerial"}>
                    </span>
					<span
                        style={{display: (this.props.item.youtube_id==null) ? "none" : "block"}}
                        onClick={(event)=> this.setState({tabInteractive: "video"})}
                        className={(this.state.tabInteractive == "video") ? "detail__ico detail__ico_video detail__ico_active" : "detail__ico detail__ico_video"}>
                    </span>
                    <span
                        onClick={(event)=> this.setState({tabInteractive: "images"})}
                        className={(this.state.tabInteractive == "images") ? "detail__ico detail__ico_images detail__ico_active" : "detail__ico detail__ico_images"}>
                    </span>
                    <span
                        onClick={(event)=> this.setState({tabInteractive: "street"})}
                        className={(this.state.tabInteractive == "street") ? "detail__ico detail__ico_street detail__ico_active" : "detail__ico detail__ico_street"}>
                    </span>
					{/* <span className="detail__ico detail__ico_360"></span> */}
				</div>
				<div className={(this.state.windowState) ? "detail__content-wrap detail__content-wrap_fullscreen" : "detail__content-wrap"}>
					{/* <span className="detail__ico detail__ico_dots"></span> */}
					<div className="detail__content">
						<div
                            className="detail__content-tab"
                            style={{display: (this.state.tabInteractive == "map_view") ? "block" : "none"}}>
                            <MapGoogleDetail status={this.state.tabInteractive}/>
                        </div>
						<div
                            className="detail__content-tab"
                            style={{display: (this.state.tabInteractive == "video") ? "block" : "none"}}>
							<iframe width="100%" height="100%" src={"https://www.youtube.com/embed/"+this.props.item.youtube_id} frameBorder="0" allowFullScreen></iframe>
						</div>
						<div
                            className="detail__content-tab"
                            style={{display: (this.state.tabInteractive == "images") ? "block" : "none"}}>
                            {/* <Slider status={this.state.tabInteractive}/> */}
						</div>
						<div
                            className="detail__content-tab"
                            style={{display: (this.state.tabInteractive == "street") ? "block" : "none"}}>
                            <Panorama status={this.state.tabInteractive}/>
                        </div>
                        <div
                            className="detail__content-tab"
                            style={{display: (this.state.tabInteractive == "aerial") ? "block" : "none"}}>
                            <Aerial status={this.state.tabInteractive}/>
                        </div>

					</div>
					{/* <div className="detail__icons">
						<span className="detail__ico detail__ico_mail"></span>
						<span className="detail__ico detail__ico_heart"></span>
						<span className="detail__ico detail__ico_share"></span>
						<span className="detail__ico detail__ico_print"></span>
						<span className="detail__ico detail__ico_bell"></span>
						<span className="detail__ico detail__ico_calc"></span>
						<span className="detail__ico detail__ico_pencil"></span>
						<span className="detail__ico detail__ico_waste"></span>
					</div> */}
				</div>
                <nav className="detail__nav">
                    <div
                        onClick={(event)=> this.setState({tabInfo: "features"})}
                        className={(this.state.tabInfo == "features") ? "detail__nav-item detail__nav-item_active" : "detail__nav-item"}>
                        Features
                    </div>
                    <div
                        onClick={(event)=> this.setState({tabInfo: "description"})}
                        className={(this.state.tabInfo == "description") ? "detail__nav-item detail__nav-item_active" : "detail__nav-item"}>
                        Description
                    </div>
                    <div
                        onClick={(event)=> this.setState({tabInfo: "details"})}
                        className={(this.state.tabInfo == "details") ? "detail__nav-item detail__nav-item_active" : "detail__nav-item"}>
                        Details
                    </div>
                    <div
                        onClick={(event)=> this.setState({tabInfo: "attachments"})}
                        className={(this.state.tabInfo == "attachments") ? "detail__nav-item detail__nav-item_active" : "detail__nav-item"}>
                        Attachments
                    </div>
                    <div
                        onClick={(event)=> this.setState({tabInfo: "contact"})}
                        className={(this.state.tabInfo == "contact") ? "detail__nav-item detail__nav-item_active" : "detail__nav-item"}>
                        Contact
                    </div>
                </nav>
				<div className="detail__info">
					<div
                        style={{display: (this.state.tabInfo == "features") ? "block" : "none"}}
                        className="detail__tab">
                        {features}
					</div>
					<div
                        style={{display: (this.state.tabInfo == "description") ? "block" : "none"}}
                        className="detail__tab">
                        {this.props.item.description}
					</div>
					<div
                        style={{display: (this.state.tabInfo == "details") ? "block" : "none"}}
                        className="detail__tab">
                        <div className="detail__prop"><b>Province:</b>{this.props.item.city}</div>
                        <div className="detail__prop"><b>Sq Ft:</b>{format.to(parseInt(this.props.item.sqft))}</div>
                        <div className="detail__prop"><b>City:</b>{this.props.item.area}</div>
                        <div className="detail__prop"><b>Beds:</b>{this.props.item.bed}</div>
                        <div className="detail__prop"><b>ZipCode:</b>{this.props.item.zipcode}</div>
                        <div className="detail__prop"><b>Baths:</b>{this.props.item.bath}</div>
                        <div className="detail__prop"><b>Type:</b>{this.props.item.type}</div>
					</div>
					<div
                        style={{display: (this.state.tabInfo == "attachments") ? "block" : "none"}}
                        className="detail__tab">
					</div>
					<div
                        style={{display: (this.state.tabInfo == "contact") ? "block" : "none"}}
                        className="detail__tab">
						<form method="post" action="">
							<input className="detail__contact-input" placeholder="Your Name" type="text"/>
							<input className="detail__contact-input" placeholder="Your Phone / Mail" type="text"/>
							<textarea className="detail__contact-textarea" placeholder="Message"></textarea>
							<input className="detail__contact-submit" type="submit" value="Send"/>
						</form>
					</div>
				</div>
            </div>
        );
    }
})
