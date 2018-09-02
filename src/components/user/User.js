import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './user.scss';
const User = ({ name, image, social }) => {
  // const { name, image, social } = user;

  return (
      <div className="col-sm-4">
        <div className="card">
          <img className="profile-img" src={image}></img>
          <p>{name}</p>
          <p></p>
          <p>------</p>
          <div className="row">
            <a className="col" href="#"><FontAwesome name='instagram' /></a>
            <a className="col" href="#"><FontAwesome name='facebook' /></a>
            <a className="col" href="#"><FontAwesome name='twitter' /></a>
          </div>
        </div>
      </div>
    );

};
// name, image, social
User.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    social: PropTypes.array.isRequired
};

export default User;
