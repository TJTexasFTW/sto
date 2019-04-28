import React, {Component} from './node_modules/react';
import {Link, Redirect} from './node_modules/react-router-dom'
import axios from './node_modules/axios';

class Employee_Update_Delete extends Component {
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
                Employee_Update_Delete
            </div>
        )
    }
}
export default Employee_Update_Delete