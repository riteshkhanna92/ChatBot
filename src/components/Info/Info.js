import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './info.scss';
const Info = ({context}) => {
  // const { name, image, social } = user;

  return (
    <div className="col-sm-12 p-0">
      <div className="card">
        <div class="card-body">
          <h5 class="card-title">Context</h5>
          <table className="table table-striped col-sm-12">
  
  <tbody>
    <tr>
      
      <td>Name</td>
      <td>{context.name}</td>
    </tr>
    <tr>
      
      <td>Email</td>
      <td>{context.email}</td>
    </tr>
    <tr>
    
      <td>Phone</td>
      <td>{context.phoneno}</td>
    </tr>
    <tr>
      
      <td>Product</td>
      <td>{context.product}</td>
    </tr>
    <tr>
     
      <td>Issue</td>
      <td>{context.issue}</td>
    </tr>
  </tbody>
</table>
        </div>
      </div>
    </div>
  );

};
// name, image, social
Info.propTypes = {
  
  context: PropTypes.object
};

export default Info;
