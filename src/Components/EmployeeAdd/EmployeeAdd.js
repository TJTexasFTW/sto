import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';

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

    componentDidMount() {
        if(!this.props.admin) {
            this.props.history.push('/');
            }
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
        axios.post('/api/employee', {
            name: this.state.name,
            initials: this.state.initials,
            password: this.state.password,
            admin: this.state.admin
        }).then(user => {
            this.setState({status: true});
            document.getElementById("inputName").value = '';
            document.getElementById("inputInitials").value = '';
            document.getElementById("inputPassword").value = '';
            document.getElementById("adminChk").checked = false;
        }).catch(error => {
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
            {addEmployeeStatus}
            
            <div className="button_choices">
                <Link to='/'><button className = "adminButton">HOME</button></Link>
                <Link to='/employee_maintenance'><button className = "adminButton">EMPLOYEE MAINT MENU</button></Link>
                <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("Login component mapState value of state: ", state)
    return {
        username: state.loginUser.user.name,
        initials: state.loginUser.user.initials,
        admin: state.loginUser.user.admin,
        id: state.loginUser.user.id
}}

export default connect(mapStateToProps)(Employee_Add);
