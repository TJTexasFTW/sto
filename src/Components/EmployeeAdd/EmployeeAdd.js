import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
// import clearInputFields from '../Functions/clearInputBoxes';

class Employee_Add extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            initials: '',
            password: '',
            admin: false,
            inactive: false,
            redirect: false,
            status: ''
        }

        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleName = (e) => {
        this.setState({name: e.target.value});
        this.setState({status: ''})
    }

    handleInitials = (e) => {
        this.setState({initials: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleAdmin = () => {
        this.setState({admin: document.getElementById("adminChk").checked})
    }

    handleSubmit = () => {
        this.setState({admin: document.getElementById("adminChk").checked});
        // console.log("Submit button clicked: ", this.state.name, this.state.initials, this.state.password, this.state.admin)
        axios.post('/api/employee', {
            name: this.state.name,
            initials: this.state.initials,
            password: this.state.password,
            admin: this.state.admin
        }).then(user => {
            //new employee added - display msg in addStatus and clear the fields
            // document.getElementById('addStatus').innerHTML = `${this.state.name} was added`;
            this.setState({status: true});
            document.getElementById("inputName").value = '';
            document.getElementById("inputInitials").value = '';
            document.getElementById("inputPassword").value = '';
            document.getElementById("adminChk").checked = false;
        }).catch(error => {
            // document.getElementById('addStatus').innerHTML = 'Employee was NOT added - the employee name or initials already exist.'
            this.setState({status: false})
        });
    }

    render() {

        let addEmployeeStatus;

        if (this.state.status) {
          addEmployeeStatus = <p id='addEmployeeStatusMsg'>{this.state.name} was added.</p>;
        } else if (this.state.status === false) {
          addEmployeeStatus = <p id='addEmployeeStatusMsg'>Employee was NOT added - the employee name or initials already exist.</p>;
        } else {
            addEmployeeStatus = <p id='addEmployeeStatusMsg'></p>;
        }


        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Add New Employee</h2>

            <div className= 'inputBoxes'>
            <p className='inputLabel'>Name:  <input onChange={this.handleName} className='inputBox' placeholder = "FLast" id="inputName" autoComplete="off"/></p>
            <p className='inputLabel'>Initials:  <input onChange={this.handleInitials} className='inputBox' placeholder = "Initials" id="inputInitials" autoComplete="off"/></p>
            <p className='inputLabel'>Password:  <input  onChange={this.handlePassword} className='inputBox' placeholder = "Password" type="password" id="inputPassword" autoComplete="off"/></p>
            <div className="Administrative">
                <label className = 'adminCheckbox'>Administrator: </label>
                <input onChange={this.handleAdmin} className = 'adminChkClass' type="checkbox" id="adminChk" />
            </div>
            </div>
            <p className='labelAdminCheck'>Check box for admin employee</p>
            {/* <center><p id='addStatus'></p></center>  */}
            {addEmployeeStatus}
            
            <div className="button_choices">
                <Link to='/'><button className = "adminButton">HOME</button></Link>
                <Link to='/employee_maintenance'><button className = "adminButton">EMPLOYEE MAINT MENU</button></Link>
                {/* <Link to='/'><button className = "adminButton">LOG OFF</button></Link> */}
                <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>

            </div>
        )
    }
}
export default Employee_Add