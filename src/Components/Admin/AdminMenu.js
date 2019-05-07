import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Admin_Menu extends Component {
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
                <h2 className = 'subHeading'>Admin Menu</h2>

            <div className = 'bigButton'>
                <Link to='/employee_maintenance'><button className = "big">Employee Maintenance</button></Link>
                <Link to='/event_maintenance'><button className = "big">Add an Event</button></Link>
                <Link to='/blocked_days'><button className = "big">Add Blocked Date</button></Link>
                <Link to='/scheduled_time_off_admin'><button className = "big">Add STO for Blocked Date</button></Link>
                <Link to='/STO_admin_delete'><button className = "big">Delete STO Entries</button></Link>
            </div>

            <div className="button_choices">
                <Link to='/'><button className = "adminButton">HOME</button></Link>
            </div>

            </div>
        )
    }
}
export default Admin_Menu