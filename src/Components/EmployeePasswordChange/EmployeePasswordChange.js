import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Employee_Password_Change extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password1: '',
            password2: ''
        }
    }

    handleName = (e) => {
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
            document.getElementById('PasswordChangeStatus').innerHTML = 'Passwords DO NOT MATCH. Please try again';
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
            document.getElementById('PasswordChangeStatus').innerHTML = `Password for ${this.state.name} was updated.`;
            document.getElementById("name_password").value = '';
            document.getElementById("password1").value = '';
            document.getElementById("password2").value = '';
        }).catch(function(error) {
            document.getElementById('PasswordChangeStatus').innerHTML = 'Houston we have problem - password change denied.'});
    }

    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Employee Password Update</h2>
                <p className='instructions'>Use update/deactivate option on Employee Maint Menu for updating other employee information.</p>
            <p className='inputLabel'>Name:  <input id="name_password" onChange={this.handleName} className='inputBox' placeholder = "FLast"/></p>
            <p className='inputLabel'>New Password:  <input id='password1' onChange={this.handlePassword1} className='inputBox' placeholder = "Password" type="password"/></p>
            <p className='inputLabel'>Confirm Pswrd:  <input id='password2' onChange={this.handlePassword2} className='inputBox' placeholder = "Password" type="password"/></p>
            <center><p id='PasswordChangeStatus'></p></center> 
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