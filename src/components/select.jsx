import React from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, Link, IndexLink } from 'react-router'
import jQuery from 'jquery';
import Classnames from 'classnames';
import Select from 'react-select';

const SelectBox = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState(){
        return {
            val : "",
            valArray:[],
            options: []
        }
    },

    propTypes:{
        filterName: React.PropTypes.string,
        filterChange: React.PropTypes.func,
        filterDisplayName : React.PropTypes.string,
        filterValue: React.PropTypes.array,
        multi: React.PropTypes.bool
    },

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },

    componentDidMount(){
        // jQuery(ReactDOM.findDOMNode(this.refs.mainNav)).find('.dropdown-toggle').dropdown();
      
        var temp_options = [];
        for (var x in this.props.filterValue){
            temp_options.push({value:this.props.filterValue[x], label:this.props.filterValue[x]})
        }
        this.setState({options: temp_options})
    },

    handleChange: function(val){
        var payload ={}
        if (this.props.multi){
             this.setState({"valArray":val});
             var templist=[]
             for (var x in val)
                templist.push(val[x].value)
             payload = {
                    [this.props.filterName]:templist
                }
        }else{
             this.setState({"val":val});
             payload = {
                    [this.props.filterName]:val.value
                }
        }
       
        
        this.props.filterChange(payload, event);
    },
   
    getSelect: function() {
        if (this.props.multi){
            return (          <Select name="form-field-name"
                                value={this.state.valArray}
                                options={this.state.options}
                                onChange={this.handleChange}
                                placeholder={this.props.filterDisplayName}
                                multi 
                            ></Select>
                )
        }else
        return (          <Select name="form-field-name"
                                value={this.state.val}
                                options={this.state.options}
                                onChange={this.handleChange}
                                placeholder={this.props.filterDisplayName}
                                 
                            ></Select>
                )
    },
    render() {
        return (
                        <div >
                            {
                              this.getSelect()
                            }
                        </div>
        );
    }
});


export default SelectBox;
