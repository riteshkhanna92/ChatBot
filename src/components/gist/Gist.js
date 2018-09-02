import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './gist.scss';
const Gist = ({ summary }) => {
  // const { name, image, social } = user;
  
  return (
    <div className="col-sm-12 p-0 gist">
      <div className="card">
        <div className="">
          <h5 className="title">Summary of conversation</h5>
          <ul className="">
          {
            summary.map((d,i)=>{
              return (
                <li>
                  {d}
                </li>
              )
            })
          }
          </ul>
        </div>
      </div>
    </div>
  );
};
// name, image, social
Gist.propTypes = {
  summary: PropTypes.array.isRequired
};

export default Gist;
