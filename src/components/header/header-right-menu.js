import React, { Component } from 'react';
import './header-right-menu.scss';
class HeaderRightMenu extends Component {
    render() {
      return (
        <div className="halfWidth" id="bs-example-navbar-collapse-1">
      
      
        <ul className="nav navbar-nav navbar-right mgtp_sty">
          
          <li className="dropdown">
            <a  className="dropdown-toggle user_account" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
        <span className="user_login"><img src="/img.svg" alt="" className="img-circle"></img></span>
        <span className="user_arrow"><img src="/icon dropdown.svg" alt="" className=""></img></span>
        </a>
            <ul className="dropdown-menu">
              <li><a >Action</a></li>
              <li><a >Another action</a></li>
              <li><a >Something else here</a></li>
              <li role="separator" className="divider"></li>
              <li><a >Separated link</a></li>
            </ul>
          </li>
        </ul>
      </div>
      );
    }
  }
  
  export default HeaderRightMenu;