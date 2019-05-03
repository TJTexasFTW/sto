import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';


class Employee_Update extends Component {
    constructor() {
        super();
        this.state = {
            currentName: '',
            name: '',
            initials: '',
            admin: false,
            inactive: false
        }
        this.handleSubmit = this.handleSubmit.bind( this );
        this.setDisplayProperty = this.setDisplayProperty.bind(this);

    }

    handleSubmit = () => {
        if (this.state.name.length === 0) {
            this.setState({name: this.state.currentName})
            }

        axios.put(`/api/employee_update/${this.state.currentName}`, {
            currentName: this.state.currentName,
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

    // handleEmployee = (e) => {
    //     this.setState({name: e.target.value})
    // }


    handleCurrentName = (e) => {
        console.log("e: ", e.target.value)
        // if (this.state.currentName = '') {
        // // console.log("handleName function invoked: ", e.target.value)
        //     //this.setState({name: e.target.value});
        //     this.setState({currentName: e.target.value}) }
        // else {
        //     this.setState({name: e.target.value})
        // }
        this.setState({currentName: e.target.value})
        this.setState({name: e.target.value})
        console.log('currentName: ', this.state.currentName, 'name: ', this.state.name);
    }

    getEmployeeData = () => {
        console.log("GET EMPLOYEE DATA function: ", this.state.currentName)


    //     axios.get('/api/currentMonth')
    //     .then(results => {this.setState({ thisMonth: results.data });
    //   }).catch( error => alert(error));


        //Get current employee values from database
        //populate input boxes
        //app.post('/api/employee_update/:id', authController.getEmployeeData);
        //axios.put(`/api/employee_password_change/${this.state.name}`, {
        axios.post(`/api/employee_update/${this.state.currentName}`, {
            currentName: this.state.currentName
        }).then(user => {
            // let {name, initials, admin, inactive} = req.body;
            console.log("user.data: ", user.data)
            let {id, name, initials, admin, inactive} = user.data.employeeList[0];
            console.log(id, name, initials, admin, inactive)

            //populate values into input boxes
            document.getElementById("initials").value = initials;
            document.getElementById("adminChk").value = admin;
            document.getElementById("deactiveChk").value = inactive;

            //populate input fields with data
            //also set state

        }).catch(function(error) {
            document.getElementById('addEmpUpdateStatus').innerHTML = 'Houston we have problem - get data request denied.'});        
    }

    setDisplayProperty() {
        let arrToggleElements =['curInitials', 'chkDeactivate', 'chkAdmin', 'submitButton','btnGetCurrentData' ]
        let elem = '';
        let displaySetting = '';
        console.log("Name: ", this.state.name);
        this.getEmployeeData();

        document.getElementById('addEmpUpdateStatus').innerHTML = 'Make desired changes and click SUBMIT button.';

        for (let i=0; i<arrToggleElements.length; i++) {
            elem = document.getElementById(arrToggleElements[i]);
            displaySetting = window.getComputedStyle(elem).display;
            if (displaySetting === 'none') {
                elem.style.display = 'block';
            } else {
                // console.log("in else statement");
                elem.style.display = 'none';
            }
      }
      this.getEmployeeData();
    }


    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Update / De-activate Employee</h2>

            <p className='inputLabel'>Name to Update:  <input name='name' onChange={this.handleCurrentName} className='inputBox' placeholder = "FLast"/></p>

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
export default Employee_Update