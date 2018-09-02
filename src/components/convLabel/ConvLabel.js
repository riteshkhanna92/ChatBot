import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './convLabel.scss';
const ConvLabel = ({ label}) => {
  // const { name, image, social } = user;

  return (
    <div className="col-sm-12 p-0">
      <div className="card">
        <div class="card-body">
          <h5 class="card-title">Labels related to conversation</h5>
          {
            label.map((i,d)=>{
              return <button key={d} className="btn btn-outline-primary">{i}</button>
            })
          }
        </div>
      </div>
    </div>
  );

};
// name, image, social
ConvLabel.propTypes = {
  
  label: PropTypes.array
};

export default ConvLabel;
