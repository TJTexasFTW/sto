import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
// import axios from 'axios';

class Login extends Component {
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
                <h2 className = 'subHeading'>Login</h2>

            <p className='inputLabel'>Name:  <input className='inputBox' placeholder = "FLast"/></p>
            <p className='inputLabel'>Password:  <input className='inputBox' placeholder = "Password"/></p>

            <div className="button_choices">
                    <Link to='/'><button className = "adminButton">HOME</button></Link>
                    <Link to='/scheduled_time_off_adds'><button className="addButton">LOG IN</button></Link>
                    
                </div>

            </div>
        )
    }
}
export default Login