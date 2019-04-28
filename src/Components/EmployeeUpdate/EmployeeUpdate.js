import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'


class Employee_Update_Delete extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
    }

    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Update / De-activate Employee</h2>

            <p className='inputLabel'>Name:  <input className='inputBox' placeholder = "FLast"/></p>
            <p className='inputLabel'>Initials:  <input className='inputBox' placeholder = "Initials"/></p>
            <p className='inputLabel'>Password:  <input className='inputBox' placeholder = "Password" type="password"/></p>
 
            <div class="Administrative">
                <label className = 'adminCheckbox' for="adminChk">Administrator: </label>
                <input className = 'adminChkClass' type="checkbox" id="adminChk"/>
            </div>
            <p className='labelAdminCheck'>Check box for admin employee</p>

            <div class="Deactivate">
                <label className = 'deactiveCheckbox' for="deactiveChk">Set as Inactive: </label>
                <input className = 'deactiveChkClass' type="checkbox" id="deactiveChk"/>
            </div>
            <p className='labelAdminCheck'>Check box to deactivate employee</p>            

            <div className="button_choices">
                <Link to='/'><button className = "adminButton">HOME</button></Link>
                <Link to='/employee_maintenance'><button className = "adminButton">EMPLOYEE MAINT MENU</button></Link>
                <Link to='/'><button className = "adminButton">LOG OFF</button></Link>
                <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>

            </div>
        )
    }
}
export default Employee_Update_Delete