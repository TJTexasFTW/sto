import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';

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
                Login
            </div>
        )
    }
}
export default Login