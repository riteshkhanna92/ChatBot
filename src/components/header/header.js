import React, { Component } from 'react';
import HeaderLeftMenu from './header-left-menu';
import HeaderRightMenu from './header-right-menu';
 
class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top headermain">
  <div className="container-fluid">
  <HeaderLeftMenu/>
  <HeaderRightMenu/>
   
  </div>
</nav>
    )
  }
}

export default Header;