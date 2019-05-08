import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Employee_Password_Change extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password1: '',
            password2: '', 
            status: ''
        }
    }

    handleName = (e) => {
        this.setState({status: ''})
        this.setState({name: e.target.value});
        console.log("NAME: ", this.state.name)
    }

    handlePassword1 = (e) => {
        this.setState({password1: e.target.value})
    }

    handlePassword2 = (e) => {
        this.setState({password2: e.target.value})

    }

    handleSubmit = () => {
        console.log("Submit button in Password Change has been clicked: ", this.state.name, this.state.password1, this.state.password2);

        //Check if password match - if they do process the submit - if not - display msg
        if (this.state.password1 !== this.state.password2) {
            // document.getElementById('PasswordChangeStatus').innerHTML = 'Passwords DO NOT MATCH. Please try again';
            this.setState({status: 'passwordsDoNotMatch'})
        } else {
            this.handleSubmit2();
        }
    }
    
    handleSubmit2 = () => {
        //check that the passwords match
        console.log("it worked!!!", this.state.password1)
        //'/api/employee_password_change'
        axios.put(`/api/employee_password_change/${this.state.name}`, {
            name: this.state.name,
            password: this.state.password1
        }).then(user => {
            //new event added - display msg in addStatus and clear the fields
            // document.getElementById('PasswordChangeStatus').innerHTML = `Password for ${this.state.name} was updated.`;
            this.setState({status: true})
            document.getElementById("name_password").value = '';
            document.getElementById("password1").value = '';
            document.getElementById("password2").value = '';
        }).catch(error => {
            this.setState({status: false})
            // document.getElementById('PasswordChangeStatus').innerHTML = 'Houston we have problem - password change denied.'
        });
    }

    render() {

        let changeEmployeePasswordStatus;

        if (this.state.status) {
          changeEmployeePasswordStatus = <p id='changeEmployeePasswordStatusMsg'>{this.state.name} password was changed.</p>;
        } else if (this.state.status === false) {
          changeEmployeePasswordStatus = <p id='changeEmployeePasswordStatusMsg'>Password was NOT changed - the employee name may not exist.</p>;
        } else if (this.state.status === 'passwordsDoNotMatch') {
            changeEmployeePasswordStatus = <p id='changeEmployeePasswordStatusMsg'>Passwords do not match. Please try again.</p>
        } else {
            changeEmployeePasswordStatus = <p id='changeEmployeePasswordStatusMsg'></p>;
        }

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Employee Password Update</h2>
                <p className='instructions'>Use update/deactivate option on Employee Maint Menu <br />for updating other employee information.</p>
            <p className='inputLabel'>Name:  <input id="name_password" onChange={this.handleName} className='inputBox' placeholder = "FLast"/></p>
            <p id='passwordInfo'>PASSWORD INFO:</p>
            <p className='inputLabel'>New:  <input id='password1' onChange={this.handlePassword1} className='inputBox' placeholder = "Password" type="password"/></p>
            <p className='inputLabel'>Confirm:  <input id='password2' onChange={this.handlePassword2} className='inputBox' placeholder = "Password" type="password"/></p>
            {/* <center><p id='PasswordChangeStatus'></p></center>  */}
            {changeEmployeePasswordStatus}
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
export default Employee_Password_Change