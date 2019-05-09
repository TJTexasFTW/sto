import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';


class Employee_Update extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            currentName: '',
            name: '',
            initials: '',
            admin: false,
            inactive: false,
            status: ''
        }
        this.handleSubmit = this.handleSubmit.bind( this );
        this.setDisplayProperty = this.setDisplayProperty.bind(this);
        this.reset = this.reset.bind(this);

    }

    handleSubmit = () => {
        console.log("Sent to axios: ", this.state.id, document.getElementById("name").value, document.getElementById("initials").value, document.getElementById("adminChk").checked, document.getElementById("deactiveChk").checked)

        axios.put(`/api/employee_update/${this.state.id}`, {
            id: this.state.id,
            name: document.getElementById("name").value,
            initials: document.getElementById("initials").value,
            admin: document.getElementById("adminChk").checked,
            inactive: document.getElementById("deactiveChk").checked
        }).then(user => {
            // //employee updated - display msg in addStatus and clear the fields
            this.reset();
            this.setState({status: true})

        }).catch(error => {
            this.setState({status: false})
        });
    }

    reset() {
        document.getElementById("name").value = '';
        document.getElementById("initials").value = '';
        document.getElementById("adminChk").value = false;
        document.getElementById("deactiveChk").value = false;

        //Need to reset form for another update
        document.getElementById("curInitials").style.display = 'none';
        document.getElementById("submitButton").style.display = 'none';
        document.getElementById("chkDeactivate").style.display = 'none';
        document.getElementById("chkAdmin").style.display = 'none';
        document.getElementById("btnGetCurrentData").style.display = 'flex';

        //Also need to clear state
        this.setState({id: 0, currentName: '', initials: '', admin: false, inactive: false})
    }


    handleCurrentName = (e) => {
        // console.log("e: ", e.target.value)
        this.setState({status: ''})
        this.setState({currentName: e.target.value})
        this.setState({name: e.target.value})
        // console.log('currentName: ', this.state.currentName, 'name: ', this.state.name);
    }

    getEmployeeData = () => {
        console.log("GET EMPLOYEE DATA function: ", this.state.currentName)
        console.log("GET EMPLOYEE DATA status: ", this.state.status)
        //Get current employee values from database
        //populate input boxes
        axios.post(`/api/employee_update/${this.state.currentName}`, {
            currentName: this.state.currentName
        }).then(user => {
            console.log("user.data: ", user.data)
            let {id, name, initials, admin, inactive} = user.data.employeeList[0];
            console.log('getEmployeeData success: ', id, name, initials, admin, inactive)

            //set values of state
            this.setState({id, name, initials, admin, inactive});
            this.setState({status: "getEmployeeData"})
        
            console.log("Get Data - state values: ", name, initials, admin, inactive)

            //populate values into input boxes
            document.getElementById("initials").value = initials;
            document.getElementById("adminChk").checked = admin;
            document.getElementById("deactiveChk").checked = inactive;
            // document.getElementById('addEmpUpdateStatus').innerHTML = 'Make the updates and click the SUBMIT button';

        }).catch(error => {
            // document.getElementById('addEmpUpdateStatus').innerHTML = 'Houston we have problem - get data request denied.'
            this.setState({status: 'getEmployeeDatafalse'})
            this.reset();
        });        
    }

    setDisplayProperty() {
        let arrToggleElements =['curInitials', 'chkDeactivate', 'chkAdmin', 'submitButton','btnGetCurrentData' ]
        let elem = '';
        let displaySetting = '';
        console.log("Name: ", this.state.name);
        this.getEmployeeData();
        this.setState({status: 'getEmployeeData'})
        // document.getElementById('addEmpUpdateStatus').innerHTML = 'Make desired changes and click SUBMIT button.';

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

        let updateEmployeeStatus;

        if (this.state.status === true) {
            updateEmployeeStatus = <p id='updateEmployeeStatusMsg'>{this.state.name} was updated.</p>;
          } else if (this.state.status === false) {
            updateEmployeeStatus = <p id='updateEmployeeStatusMsg'>Update NOT made - the employee name may not exist.</p>;
          } else if (this.state.status === 'getEmployeeData') {
              updateEmployeeStatus = <p id='updateEmployeeStatusMsg'>Make desired changes and click SUBMIT button.</p>
        } else if (this.state.status === 'getEmployeeDatafalse') {
            updateEmployeeStatus = <p id='updateEmployeeStatusMsg'>No employee matched the requested name.</p>          } 

        else {
              updateEmployeeStatus = <p id='updateEmployeeStatusMsg'>Enter FLast of employee to update and click Get Current Data button.</p>;
          }

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Update / De-activate Employee</h2>

            <p className='inputLabel'>Name:  <input id='name' onChange={this.handleCurrentName} className='inputBox' placeholder = "FLast" autoComplete='off'/></p>

            <p id='curInitials' className='inputLabel'>Initials:  <input className='inputBox' placeholder = "Initials" id = 'initials' autoComplete='off'/></p>
 
            <div id='chkAdmin' className="Administrative">
                <label className = 'adminCheckbox' id="lblAdmin">Administrator: </label>
                <input className = 'adminChkClass' type="checkbox" id="adminChk"/>
                <p className='labelAdminCheck' id='lblAdminCheckNote'>Check box for admin employee</p>
            </div>

            <div id='chkDeactivate' className="Deactivate">
                <label className = 'deactiveCheckbox' id='lblInactive'>Inactive: </label>
                <input className = 'deactiveChkClass' type="checkbox" id="deactiveChk"/>

            <p className='labelAdminCheck' id='lblInactiveNote'>Check box to deactivate employee</p>   
            </div>
            <br></br>
            {updateEmployeeStatus}
            {/* <center><p id='addEmpUpdateStatus'>Enter FLast of employee to update and click Get Current Data button.</p></center>     */}
            <center><p id='addEmpUpdateNote'>NOTE: Return to EMPLOYEE MAINT MENU to update password.</p></center>       

            
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