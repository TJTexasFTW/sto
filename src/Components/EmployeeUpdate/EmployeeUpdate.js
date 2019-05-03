import React, {Component} from 'react';
import {Link} from 'react-router-dom'


class Employee_Update_Delete extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            initials: '',
            admin: false,
            inactive: false
        }
    }

    setDisplayProperty() {
        let arrToggleElements =['curInitials', 'chkDeactivate', 'chkAdmin', 'submitButton','btnGetCurrentData' ]
        let elem = '';
        let displaySetting = '';

        document.getElementById('addEmpUpdateStatus').innerHTML = 'Make desired changes and click SUBMIT button.';

        for (let i=0; i<arrToggleElements.length; i++) {
            elem = document.getElementById(arrToggleElements[i]);
            displaySetting = window.getComputedStyle(elem).display;
            if (displaySetting === 'none') {
                elem.style.display = 'block';
            } else {
                console.log("in else statement");
                elem.style.display = 'none';
            }
      }
    }


    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Update / De-activate Employee</h2>

            <p className='inputLabel'>Name to Update:  <input className='inputBox' placeholder = "FLast"/></p>
            {/* <p id='revName' className='inputLabel'>Revised Name:  <input className='inputBox' placeholder = "FLast"/></p> */}
            {/* <p className='instructions' id="empUpdateInstructions"></p> */}
            <p id='curInitials' className='inputLabel'>Initials:  <input className='inputBox' placeholder = "Initials"/></p>
            {/* <p id='revInitials' className='inputLabel'>Revised Initials:  <input className='inputBox' placeholder = "Initials"/></p> */}

            {/* <p className='inputLabel'>Password:  <input className='inputBox' placeholder = "Password" type="password"/></p> */}
 
            <div id='chkAdmin' class="Administrative">
                <label className = 'adminCheckbox' for="adminChk">Administrator: </label>
                <input className = 'adminChkClass' type="checkbox" id="adminChk"/>
                <p className='labelAdminCheck'>Check box for admin employee</p>
            </div>

            <div id='chkDeactivate' class="Deactivate">
                <label className = 'deactiveCheckbox' for="deactiveChk">Set as Inactive: </label>
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
export default Employee_Update_Delete