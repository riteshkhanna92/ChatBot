import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import './sentiment.scss';
const Sentiment = ({ sentiment }) => {
  // const { name, image, social } = user;
  let getSentiment = () => {
   
      if (sentiment == "very positive")
        return (<i style={{"color":"green"}}><FontAwesome name="smile"></FontAwesome> <FontAwesome name="thumbs-up"></FontAwesome> </i>)
      if (sentiment == "positive")
        return (<i style={{"color":"green"}}><FontAwesome name="thumbs-up"></FontAwesome></i>)
      if (sentiment == "neutral")
        return <i style={{"color":"grey"}}><FontAwesome name="smile"></FontAwesome> </i>
      if (sentiment == "negative")
        return <i style={{"color":"yellow"}}><FontAwesome name="frown"></FontAwesome> </i>
      if (sentiment == "very negative")
        return <i style={{"color":"red"}}><FontAwesome name="thumbs-down"></FontAwesome> On Fire</i>
    
  }
  return (
    <div className="col-sm-12 p-0">
      <div className="card">
        <div className="">
          <h5 className="">User Sentiment</h5>
          <p className=" sentiment-para">{getSentiment()}</p>
        </div>
      </div>
    </div>
  );

};
// name, image, social
Sentiment.propTypes = {
  sentiment: PropTypes.number.isRequired
};

export default Sentiment;
