import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';

class Employee_Maintenance_Menu extends Component {
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
                Employee_Maintenance_Menu
            </div>
        )
    }
}
export default Employee_Maintenance_Menu