import * as React from 'react';

import { NewsLetter } from './footer/NewsLetter.jsx';

export const Footer = React.createClass({
    componentDidMount() {
    },
    componentWillUnmount() {
    },
    render() {
        return (
            <div className="footer">
        		<div className="footer__content">
                    <div className="footer__wrap footer__flex">
                        <div className="footer__column">
            				<div className="footer__column">
            					<div className="footer__title">About site</div>
            					<div className="footer__text">
            						Lorem ipsum dolor sit amet, consectetur<br/>
            						adipisicing elit, sed do eiusmod<br/>
            						tempor incididunt ut labore et dolore<br/>
            						magna aliq
            					</div>
            				</div>
            				<div className="footer__column">
            					<div className="footer__title">Contact us</div>
            					<div className="footer__text">
            						<div className="footer__desc"><i className="fa fa-location-arrow"></i>774 NE 84th St Miami, FL 33879</div>
            						<div className="footer__desc"><i className="fa fa-phone"></i>Call us FREE +1 (800) 990 8877</div>
            						<div className="footer__desc"><i className="fa fa-envelope-o"></i>info@ez.com</div>
            					</div>
            				</div>
            			</div>
                        <div className="footer__column">
                            <div className="footer__column"></div>
                            <div className="footer__column">
                                <NewsLetter/>
                				<div className="footer__follow">
                					<span className="footer__title">Follow us</span>
                					<div className="footer__icons">
                						<a href="#" target="_blank" className="footer__social">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                						<a href="#" target="_blank" className="footer__social">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                					</div>
                				</div>
                            </div>
            			</div>
                    </div>
        		</div>
        		<div className="footer__copyright">
        			<div className="footer__wrap footer__flex">
                        <div>idsrealty.com - All right reserved</div>
        				<div className="footer__nav">
        					<a href="#">Privacy</a>
        					<a href="#">Terms & Conditions</a>
        				</div>
        			</div>
        		</div>
        	</div>
        );
    }
});
