import React, { Component } from 'react';
import './header-left-menu.scss';
class HeaderLeftMenu extends Component {


  constructor(props) {
    super(props)
    this.state = { screenSize: 'sidescreen' }
    this.radioBtnChanged = this.radioBtnChanged.bind(this);

  }
  radioBtnChanged(e) {
    this.setState({
      screenSize: e.currentTarget.value
    });
    if (e.currentTarget.value == 'sidescreen') {




      window.resizeTo(400, 800);
    }
    else {

      window.resizeTo(window.screen.availWidth, window.screen.availHeight);
    }
  }
  render() {
    return (


      <div className="navbar-header">


        <div className="dropdown">
          <a className="navbar-brand hambuger pull-left btn btn-primary dropdown-toggle" data-toggle="dropdown">
            <img src="/icon menu.svg" alt="" className=""></img>
          </a><a className="navbar-brand logoxavtls">
            <img src="/logo.svg" alt="User Avatar" className=""></img>
          </a>

          {/* <ul className="dropdown-menu customtoptgl">
            <li> <label><input type="radio" checked={this.state.screenSize === 'sidescreen'}
              onChange={this.radioBtnChanged} id="input${1/(\w+)/\u\1/g}" value="sidescreen" ></input><span>Side Screen</span></label></li>
            <li><label><input type="radio" checked={this.state.screenSize === 'fullscreen'}
              onChange={this.radioBtnChanged} id="input${1/(\w+)/\u\1/g}" value="fullscreen" ></input><span>Full Screen</span></label></li>

          </ul> */}






        </div>
      </div>



    )
  }
}

export default HeaderLeftMenu;