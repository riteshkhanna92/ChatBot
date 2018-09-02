import React from 'react';
import PropTypes from 'prop-types';
import './nav.scss'

const Header = ({}) => (
  <div className="search-nav">
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
    <button className="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <a className="navbar-brand" href="#">
      <img className="logo" src="./logo.png"></img>
    </a>

    <div className="collapse navbar-collapse nav-bar-search" id="navbarNav">
    <input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
    <button className="btn btn-danger">Search</button>
    </div>

    <div className="collapse navbar-collapse" id="navbarNav">
      {/*<ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>*/}
      <button className="btn btn-secondary">Logout</button>
    </div>
  </nav>
</div>
);

export default Header;
