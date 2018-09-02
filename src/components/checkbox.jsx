import React from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, Link, IndexLink } from 'react-router'
import jQuery from 'jquery';
import Classnames from 'classnames';


const CheckBox = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },

    propTypes:{
        filterName: React.PropTypes.string,
        filterChange: React.PropTypes.func,
        filterDisplayName : React.PropTypes.string
    },

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },

    componentDidMount(){
        // jQuery(ReactDOM.findDOMNode(this.refs.mainNav)).find('.dropdown-toggle').dropdown();
    },


    handleSwitch: function(event){
        var payload = {
            [this.props.filterName]:event.target.checked
        }
        this.props.filterChange(payload, event);
    },
   
    render() {
        return (
                    <div className="checkbox ">
                        <label><input type="checkbox" value="true" onChange={this.handleSwitch}></input>{this.props.filterDisplayName}</label>
                    </div>
        );
    }
});


export default CheckBox;
