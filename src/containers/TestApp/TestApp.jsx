import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import ChatBody from '../../components/message-panel/chat-body'
import './testapp.scss';
import Loginform from '../../components/login-form/login-form';
import { Router, Route, Switch,Redirect} from 'react-router';
class TestApp extends Component {

  componentDidMount = () => {
    window.resizeTo(400, 800);
  }
  render() {
    const { user } = this.props;

    return (

      <div className="container">
      
        <Router>
          
        <Redirect from="/" to="loginForm" />
        <Route path="/loginForm" component={Loginform} />
            <Route path="/ChatBody" component={ChatBody} />


        
          </Router>
      </div>
    );
  }
}
TestApp.propTypes = {
  user: PropTypes.string,
  // children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
TestApp.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    user: auth ? auth.user : null,
  };
};
export default connect(
  mapStateToProps
)(TestApp);
