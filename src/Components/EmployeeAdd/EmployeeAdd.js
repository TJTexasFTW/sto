import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';

class Employee_Add extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            initials: '',
            password: '',
            admin: false,
            inactive: false,
            redirect: false
        }
    }

    handleName = (e) => {
        this.setState({name: e.target.value})
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
        console.log("Submit button clicked: ", this.state.name, this.state.initials, this.state.password, this.state.admin)
        axios.post('/api/employee', {
            name: this.state.name,
            initials: this.state.initials,
            password: this.state.password,
            admin: this.state.admin
        }).then(user => {
            //update redux state with the new user
            //import the action creator
            //mapStateToProps
            //connect
            //Provider
            // this.props.updateUser(user.data);
            this.setState({redirect: true})
        })
    }

    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Add New Employee</h2>

            <p className='inputLabel'>Name:  <input onChange={this.handleName} className='inputBox' placeholder = "FLast"/></p>
            <p className='inputLabel'>Initials:  <input onChange={this.handleInitials} className='inputBox' placeholder = "Initials"/></p>
            <p className='inputLabel'>Password:  <input onChange={this.handlePassword} className='inputBox' placeholder = "Password" type="password"/></p>
            <div className="Administrative">
                <label className = 'adminCheckbox'>Administrator: </label>
                <input onChange={this.handleAdmin} className = 'adminChkClass' type="checkbox" id="adminChk"/>
            </div>
            <p className='labelAdminCheck'>Check box for admin employee</p>
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
export default Employee_Add