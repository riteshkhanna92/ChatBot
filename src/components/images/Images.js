import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './images.scss';
const Images = ({ imgs}) => {
  // const { name, image, social } = user;

  return (
    <div className="col-sm-12 p-0">
      <div className="card">
        <div class="card-body">
          <h5 class="card-title">Images</h5>
          {
            imgs.map((d,i)=>{
              return (
              // <div><img key={i} src={d} className="col-sm-12 p-0"></img></div>
             <div key={i}>
              <button type="button" className="btn btn-info btn-lg" style={{"background-color": "transparent"}} data-toggle="modal" data-target={"#"+i}>
                <img key={i} src={d} className="col-sm-12 p-0"></img>
              </button>
         
              <div id={i} className="modal fade" role="dialog">
                <div className="modal-dialog">
              
              
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      {/* <h4 className="modal-title">Images</h4> */}
                    </div>
                    <div className="modal-body">
                      <p><img key={i} src={d} className="col-sm-12 p-0"></img></p>
                    </div>
                  
                  </div>
              
                </div>
              </div>
                </div>

            )
            })
          }
        </div>
      </div>
    </div>
  );

};
// name, image, social
Images.propTypes = {
  
  imgs: PropTypes.array
};

export default Images;
