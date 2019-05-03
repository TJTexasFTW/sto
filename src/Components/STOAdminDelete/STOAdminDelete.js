import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';


class STOAdminDelete extends Component {
    constructor() {
        super();
        this.state = {
                name: '',
                startDate: new Date(),
                endDate: new Date(),
                comment: ''
        }
        this.handleSubmit = this.handleSubmit.bind( this );
        this.setDisplayProperty = this.setDisplayProperty.bind(this);
    }

    handleSubmit = () => {

    }

    handleCurrentName = (e) => {

    }

    getEmployeeData = () => {
         
    }

    setDisplayProperty() {

    }


    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Delete STO Entries</h2>

            <p className='inputLabel'>Name to Update:  <input id='name' onChange={this.handleCurrentName} className='inputBox' placeholder = "FLast"/></p>

            <p id='curInitials' className='inputLabel'>Initials:  <input className='inputBox' placeholder = "Initials" id = 'initials'/></p>
 
            <div id='chkAdmin' className="Administrative">
                <label className = 'adminCheckbox' >Administrator: </label>
                <input className = 'adminChkClass' type="checkbox" id="adminChk"/>
                <p className='labelAdminCheck'>Check box for admin employee</p>
            </div>

            <div id='chkDeactivate' className="Deactivate">
                <label className = 'deactiveCheckbox'>Set as Inactive: </label>
                <input className = 'deactiveChkClass' type="checkbox" id="deactiveChk"/>

            <p className='labelAdminCheck'>Check box to deactivate employee</p>   
            </div>
            <br></br>
            <center><p id='addEmpUpdateStatus'>Enter FLast and click Get Current Data button.</p></center>    <center><p id='addEmpUpdateNote'>NOTE: Return to EMPLOYEE MAINT MENU to update password.</p></center>       

            
            <div className="button_choices">
                <Link to='/'><button className = "adminButton">HOME</button></Link>
                <Link to='/employee_maintenance'><button className = "adminButton">EMPLOYEE MAINT MENU</button></Link>
                {/* <Link to='/'><button className = "adminButton">LOG OFF</button></Link> */}
                <button onClick={this.handleSubmit} className="adminButton" id='submitButton'>SUBMIT</button>
                <button id='btnGetCurrentData' onClick={this.setDisplayProperty} className = "adminButton">GET CURRENT DATA</button>
                    
                </div>

            </div>
        )
    }
}
export default STOAdminDelete