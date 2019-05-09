import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';

class EmployeeLists extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            currentName: '',
            name: '',
            initials: '',
            admin: false,
            inactive: false,
            status: '',
            empList: []

    }
    }

    componentDidMount() {
        if(!this.props.admin) {
        this.props.history.push('/');
                }
        this.getEmployeeListActive();
            }        

getEmployeeListActive = () => {
    
        axios.get('/api/employeelists').then(employeeList => {
            // //employee active list retrieved
            this.setState({empList: employeeList.data}, () => {
                console.log("AFTER STATE UPDATE: ", this.state.empList)
            });
            console.log("Axios get list: ", employeeList.data)
            console.log("empList: ", this.state.empList)
            // this.makeEmployeeList(employeeList.data)
        }).catch(error => alert(error));
    }

    render() {

    let empListHTML = 
        <table id='empActive' ><tr id='tableHeader'><th>NAME</th><th>INITIALS</th><th>ADMIN</th></tr>
            {this.state.empList.map(employee => 
        <tbody key={employee.name}><tr>
                <td>{employee.name}</td>
                <td>{employee.initials}</td>
                <td>{employee.admin}</td>
            </tr>
        </tbody>  
        )}
        </table>

        console.log('empListHTML: ', empListHTML)

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Employee List - Active</h2>
                {empListHTML}
                <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <Link to='/employee_maintenance'><button className = "adminButton">EMPLOYEE MAINT MENU</button></Link>
                    {/* <button id='btnGetEmployeeListActive' onClick={this.getEmployeeListActive} className = "adminButton">GET LIST ACTIVE</button> */}
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

export default connect(mapStateToProps)(EmployeeLists);
