import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            id: 0,
            initials: '',
            admin: false,
            inactive: false,
            redirect: false
        }
    }

    handleUsername = (e) => {
        this.setState({username: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleClick = e => {
        axios.post('/api/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            this.setState({redirect: true});
        })
    }

    render() {

        return(
            <div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <h2 className = 'subHeading'>Login</h2>

            <p className='inputLabel'>Name:  <input onChange={this.handleUsername} className='inputBox' placeholder = "FLast"/></p>
            <p className='inputLabel'>Password:  <input onChange={this.handlePassword} className='inputBox' placeholder = "Password"/></p>

            <div className="button_choices">
                    <Link to='/'><button onClick={this.handleClick} className = "adminButton">HOME</button></Link>
                    <Link to='/scheduled_time_off_adds'><button className="addButton">LOG IN</button></Link>
                    
                </div>

            </div>
        )
    }
}
export default Login