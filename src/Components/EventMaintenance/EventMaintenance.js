import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';

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
                Event_Maintenance
            </div>
        )
    }
}
export default Event_Maintenance