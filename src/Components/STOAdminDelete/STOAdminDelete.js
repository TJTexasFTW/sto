import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import axios from 'axios';
import './STOAdminDelete.css';

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
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Delete STO Entries</h2>
                <p className='box1'></p>
                <p className='box2'>Employee Name:  </p><input id='name' onChange={this.handleCurrentName} className='box3' placeholder = "FLast"/>
                <p id='curInitials' className='inputLabel'>Initials:  <input className='inputBox' placeholder = "Initials" id = 'initials'/></p>
                </div>
            <center><p id='addEmpUpdateStatus'>Enter FLast and click Get Current Data button.</p></center> 
            <center><p id='addEmpUpdateNote'>NOTE: Return to EMPLOYEE MAINT MENU to update password.</p></center>       

            
            <div className="button_choices">
                <Link to='/'><button className = "adminButton">HOME</button></Link>
                <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link>
                {/* <Link to='/'><button className = "adminButton">LOG OFF</button></Link> */}
                <button onClick={this.handleSubmit} className="adminButton" id='submitButton'>SUBMIT</button>
                <button id='btnGetCurrentData' onClick={this.setDisplayProperty} className = "adminButton">GET CURRENT DATA</button>
                    
                </div>

            </div>
        )
    }
}
export default STOAdminDelete