import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Classname from 'classnames';
import FontAwesome from 'react-fontawesome';
import './nav.scss'


const Footer = () => {

    var html = (<div className="footer">
        <div className="menu">
            <div className="row-con">
                <div className="logo-wrapper"><img className="logo" src="./logo.png"></img></div>
                <div className="row">
                    <a className="col" href="#"><FontAwesome name='instagram' /></a>
                    <a className="col" href="#"><FontAwesome name='facebook' /></a>
                    <a className="col" href="#"><FontAwesome name='twitter' /></a>
                </div>
            </div>

            <div className="row-con">
                <div className="row">
                    <a className="col" href="/aboutus">About</a>
                    <a className="col" href="/team">Team</a>
                    <a className="col" href="/careers">Careers</a>
                    <a className="col" href="/contactus">Contact us</a>
                    <a className="col" href="/tandc">Terms and Conditions</a>
                </div>
                <p>2017 All Rights Reserved. Overhaul India.</p>
            </div>

        </div>
    </div>);
    return html
}

export default Footer;
