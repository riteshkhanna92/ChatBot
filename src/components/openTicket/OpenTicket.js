import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './openTicket.scss';
const OpenTicket = ({ name, image, social }) => {
  // const { name, image, social } = user;

  return (
    <div className="col-sm-12 p-0">
      <div className="card">
        <div className="">
          <h5 className="">Zendesc tickets</h5>
          <form>
            <div className="form-group">
              <label for="assigneeinput">Assignee</label>
              <input type="text" className="form-control" id="assigneeinput" aria-describedby="emailHelp" placeholder="Assignee Name"></input>
              <small id="emailHelp" className="form-text text-muted">Assignee Name.</small>
            </div>
            <div className="form-group">
              <label for="tags">Tags</label>
              <input type="text" className="form-control" id="exampleInputPassword1" placeholder="tags"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );

};
// name, image, social
OpenTicket.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  social: PropTypes.array
};

export default OpenTicket;
