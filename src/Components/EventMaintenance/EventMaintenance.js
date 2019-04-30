import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import axios from 'axios';

class Event_Maintenance extends Component {
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
                <h2 className = 'subHeading'>Event Maintenance</h2>

            <p className='inputLabel'>Date:  <input className='inputBox' placeholder = "Start Date" type="date"/></p>
            <p className='inputLabel'>Note:  <input className='inputBox' placeholder = "Note"/></p>

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <Link to='/'><button className = "adminButton">LOG OFF</button></Link>
                    <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link>
                    <button className = "adminButton">DELETE</button>
                    <button onClick={this.handleSubmit} className="adminButton">SUBMIT</button>
                    
                </div>

            </div>
        )
    }
}
export default Event_Maintenance