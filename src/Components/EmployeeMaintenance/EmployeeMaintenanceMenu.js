import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

class Employee_Maintenance_Menu extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
    }

    componentDidMount() {
        if(!this.props.admin) {
        this.props.history.push('/');
                }
            }
        

    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Employee Maintenance Menu</h2>

            <div className = 'bigButton'>
                <Link to='/employee_add'><button className = "big">Add</button></Link>
                <Link to='/employee_update'><button className = "big">Update/Deactivate</button></Link>
                <Link to='/employee_password_change'><button className = "big">Change Password</button></Link>
                <Link to='/employee_lists'><button className = "big">Employee List - ACTIVE</button></Link>
                <Link to='/employee_lists'><button className = "big">Employee List - INACTIVE</button></Link>
            </div>

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link>

            </div>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtSvn0a_2sBp-FiE8pTRAh0TVqUMjIpWyofXsCYwUxu4kuQcCHkw' alt="Lake Dock" className="dockSub" />
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

export default connect(mapStateToProps)(Employee_Maintenance_Menu);