import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import axios from 'axios';

class Employee_Maintenance_Menu extends Component {
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
                <h2 className = 'subHeading'>Employee Maintenance Menu</h2>

            <div className = 'bigButton'>
                <Link to='/employee_add'><button className = "big">Add Employee</button></Link>
                <Link to='/employee_update'><button className = "big">Update/Deactivate Employee</button></Link>
            </div>

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link>
                    <Link to='/'><button className = "adminButton">LOG OFF</button></Link>
                    <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
            </div>

            </div>
        )
    }
}
export default Employee_Maintenance_Menu