import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './newTest.scss';

const NewTest = ({ name, phone}) => {
  // const { name, image, social } = user;

  return (
    <div className="newtest">
      <h1>{name}</h1>
      <h1>{phone}</h1>
    </div>
  );

};
// name, image, social
NewTest.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string
};

export default NewTest;
