import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
 
import './app.scss';
import Header from '../../components/header/header';

class App extends Component {
  componentDidMount = () => {
    window.resizeTo(400, 800);
  }
  render() {
    const { user } = this.props;
   
    return (
      <div className="appContent">
       <Header />
          {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  user: PropTypes.string,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
App.contextTypes = {
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
)(App);
