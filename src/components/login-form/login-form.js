import React, { Component } from 'react';
import './login-form.scss';
import {browserHistory} from 'react-router';
class Loginform extends Component {
    constructor(props) {

        super(props)
        this._handleKeyPress = this._handleKeyPress.bind(this);
       
    }

    _handleKeyPress(e) {
        e.preventDefault();
         
        browserHistory.push({ pathname: '/ChatBody' });
    }
    
    render() {
        return ( 
        <div id="genesys_webchat_123" className="ChatUI" >
            <div className="form">
                <form  name="formChat" id="formChat">

                    <div id="id_logo_bar" className="logo_bar">
                        <img src="./logo.svg"></img>
                        <div id="livechat">Live Chat</div>
                        <input type="button" id="l_end_chat" className="close" name="close" value="End Chat">
                        </input>
                    </div>
                    

                    <label>
                        <span id="l_nickname">Your Name: *</span>
                        <input type="text" name="nickname" id="initiator_name" className="valid"></input>

                        </label>
                  
                    <label>
                        <span id="l_employee_id">Employee ID: *</span>
                        <input type="text" name="employee_id" className="valid"></input>

                        </label>
                   
                    <label style={{display:'block'}}>
                        <span id="l_department">Who would you like to chat with?</span>
                        <label    className="error" style={{ display: 'none'}}>This field is required.</label><select name="department" className="valid">
                            <option value="" id="l_SELECT_ONE">Please select one</option>
                            <option value="AVS Fraud Administration"   id="l_avs_fraud_admin">AVS Fraud Administration</option>
                            <option value="Case Support Mobility Help Desk"   id="l_cc_help_desk">Case Support Mobility Help Desk</option>
                            <option value="Loyalty &amp; Retention"   id="l_loyalty_retention">Loyalty &amp; Retention</option>
                        </select>
                    </label>
                    <label style={{display:'none'}}>
                        <span id="l_department_french"></span>
                        <select name="department_french" id="department" disabled="">
                            <option value="" id="l_SELECT_ONE">Please select one</option>
                            <option value="Case Support Mobility Help Desk"  id="l_cc_help_desk">Case Support Mobility Help Desk</option>
                            <option value="Loyalty &amp; Retention"   id="l_loyalty_retention">Loyalty &amp; Retention</option>
                        </select>
                    </label>
                    <label style={{ display: 'none' }}>
                        <span id="l_dept1_support_topic">Please select the appropriate support topic: *</span>
                        <select name="dept1_support_topic" id="support_topic" disabled="">
                            <option value="" id="l_SELECT_ONE">Please select one</option>
                            <option value="Add/remove feature" id="l_add_remove_feature">Add/remove feature</option>
                            <option value="Add/remove rate plan" id="l_add_remove_rateplan">Add/remove rate plan</option>
                            <option value="Ship to tool request" id="l_ship_request">Ship to tool request</option>
                            <option value="PAC" id="l_pac">PAC</option>
                            <option value="MSC corrections" id="l_msc_corrections">MSC corrections</option>
                        </select>
                    </label>
                    <label style={{ display: 'none' }}>
                        <span id="l_dept2_support_topic">Please select the appropriate support topic: *</span>
                        <select name="dept2_support_topic" id="support_topic" disabled="">
                            <option value="" id="l_SELECT_ONE">Please select one</option>
                            <option value="Provisioning - feature or rate plan" id="l_prov_feature_rateplan">Provisioning - feature or rate plan</option>
                            <option value="Provisioning - LRT or Help Desk" id="l_prov_lrt_helpdesk">Provisioning - LRT or Help Desk</option>
                            <option value="Provisioning - OOM offer" id="l_prov_oom_offer">Provisioning - OOM offer</option>
                        </select>
                    </label>
                    <label style={{ display: 'block' }}>
                        <span id="l_ban">Customer Account Number: *</span> 
                        <input type="text" name="ban" className="valid"></input> </label>
                      
                  
                    <label style={{ display: 'block' }}>
                        <span id="l_cc_token">Credit card token: *</span>
                        <input type="text" name="cc_token" className="valid"></input>
                        </label>
                      
                    
                    <label style={{ display: 'block' }}>
                        <span id="l_error_message">Error message: *</span>
                        </label>
                        <select name="error_message" className="valid">
                            <option value="" id="l_SELECT_ONE">Please select one</option>
                            <option value="AVS mismatch" id="l_avs_mismatch">AVS mismatch</option>
                            <option value="International credit card" id="l_international_cc">International credit card</option>
                            <option value="Credit card listed in negative database" id="l_cc_negative">Credit card listed in negative database</option>
                            <option value="Credit card declined by financial institution" id="l_cc_declined">Credit card declined by financial institution</option>
                        </select>
                        <label style={{ display: 'none' }}>
                            <span id="l_cc_declined_note">Please advise customer to contact their Financial institution – NO SUPPORT will be provided on chat, and NO AVS Management Form is to be sent.</span>
                            </label>
                            <input type="hidden" name="cc_declined_note" disabled="" value=""></input>
                       
                    
                    <label style={{ display: 'none' }}>
                        <span id="l_lnr_which_team">Please select your department: *</span>
                        </label>
                        <select name="lnr_which_team" id="which_team" disabled="">
                            <option value="" id="l_SELECT_ONE">Please select one</option>
                            <option value="LNR/CRMT" id="l_lnr_crmt">LNR/CRMT</option>
                            <option value="Channel Care" id="l_DEPT_CHANNELCARE">Channel Care</option>
                            <option value="Customer Care" id="l_customer_care">Customer Care</option>
                            <option value="Advanced Care/CR1" id="l_adv_care_cr1">Advanced Care/CR1</option>
                            <option value="DNA/TSS" id="l_dna_tss">DNA/TSS</option>
                            <option value="Corporate Store" id="l_corporate_store">Corporate Store</option>
                            <option value="Authorized Dealer " id="l_authorized_dealer">Authorized Dealer </option>
                            <option value="Other" id="l_other">Other</option>
                        </select>
                   
                    <label style={{ display: 'none' }}>
                        <span id="l_customer_name">Customer Name:*</span>
                        <input type="text" name="customer_name" disabled=""></input>
                        </label>
                       
                   
                    <label style={{display: 'none'}}>
                        <span id="l_subscriber_number">Phone Number: *</span>
                        <input type="text" name="subscriber_number" disabled=""></input>
                        </label>
                     
                  

                    <label>
                        <select name="language" style={{ display: 'none' }} className="valid">
                            <option value="en"></option>
                            <option value="fr"></option>
                        </select>
                    </label>


                    <button id="id_submit" className="submit" onClick={this._handleKeyPress}>Start Chat</button>

                    {/* `<input type="hidden" name="portal" value="mobilityhelp">  </input>
                    <input type="hidden" name="firstname" value="Unknown">  </input>

                    <input type="hidden" name="lastname" value=""></input>` */}

                </form>
            </div>

            <div className="transcript" id="id_transcript"></div>
            <div className="input-container">
                <textarea className="input"></textarea>
                <button id="id_send" id="l_sendmessage" className="send" name="send" value="">Send</button>
                
            </div>
            <div className="isTyping"></div>
        </div>
        )
    }
}

export default Loginform;