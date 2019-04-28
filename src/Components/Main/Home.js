import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';

class Home extends Component {
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
            <div className="Home">
                SCHEDULED TIME OFF
            
            <p className="current_month">CURRENT MONTH</p>
            <p className="next_month">NEXT MONTH</p>
            <p className="two_months_out">TWO MONTHS OUT</p>
            </div>
        )
    }
}
export default Home