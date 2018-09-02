import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './test.scss';
const Test = ({ summary }) => {
  // const { name, image, social } = user;

  return (
    <div className="col-sm-12 p-0 test">
      <div className="card">
        <div className="">
          <h5 className="">Test</h5>
          <p className="">{summary}</p>
        </div>
      </div>
    </div>
  );
};

Test.propTypes = {
  summary: PropTypes.string.isRequired
};

export default Test;
