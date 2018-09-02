import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
// import Switch from 'react-toggle-switch';
import FontAwesome from 'react-fontawesome';
import './nav.scss';
const HomeNav = ({ scroll, toggle_shift, toggle_shift_value }) => {
    let sm = (scroll > 100) ? true : false;
    let logout = () => {
        window.sessionStorage.clear();
        browserHistory.push({ pathname: '/login' });
    }
    let toggle_text = () =>
    {
        if(toggle_shift_value)
            return (<span><FontAwesome name='pause'></FontAwesome><b>  Pause shift</b></span>)
        else
            return (<span><FontAwesome name='play'></FontAwesome><b>  Resume shift</b></span>)
    }   
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <span className="navbar-brand" ><img className="profile-pic" src={"profile.png"}></img>{window.sessionStorage.getItem("token")}</span>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto ml-auto">
                
                    <li className="nav-item ">
                        <a className="nav-link" href="#">Shift start time <b>12:00 AM</b></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Shift end time <b>08:00 PM</b></a>
                    </li>
                    <li>
                        <button className={classNames({"btn my-2 my-sm-0 ml-4":true, "btn-outline-warning":(toggle_shift_value),"btn-outline-success":(!toggle_shift_value)})} onClick={toggle_shift} href="#">
                            {toggle_text()}
                        </button>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto mt-2 my-lg-0">
                    <li className="nav-item">
                        <a className="nav-link disabled" onClick={logout} href="#">Logout</a>
                    </li>
                </ul>

            </div>
        </nav>
    );
}
HomeNav.propTypes = {
    scroll: React.PropTypes.number,
    toggle_shift_value: React.PropTypes.boolean,
    toggle_shift: React.PropTypes.function
};

export default HomeNav;
