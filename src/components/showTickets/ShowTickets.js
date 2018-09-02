import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './showTickets.scss';
const ShowTicktets = ({ tickets }) => {
  // const { name, image, social } = user;

  return (
    <div className="col-sm-12 p-0">
      <div className="card ">
        <div className="col-sm-12 row">
          <h5 className="">Tickets history</h5>
          <div className="card col-sm-12 ticket-card">
            <h6>Ticket Id - A12334</h6>
            <p>Unable to change subscription plan. </p>
            <div className="col-sm-12 rows">
              <button className="btn btn-outline-primary col-md-5" >Goto ticket</button>
              <button className="btn btn-outline-success col-md-5 ml-4">Resolved</button>
            </div>
          </div>
          <div className="card col-sm-12 ticket-card">
            <h6>Ticket Id - AC1332</h6>
            <p>Unable to change subscription plan. </p>
            <div className="col-sm-12">
              <button className="btn btn-outline-primary col-md-5" >Goto ticket</button>
              <button className="btn btn-outline-success col-md-5 ml-4">Resolved</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};
// name, image, social
ShowTicktets.propTypes = {
  tickets: PropTypes.array
};

export default ShowTicktets;
