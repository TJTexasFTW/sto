import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import './Home.css';

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
            <body>
            <div className="Home">
                SCHEDULED TIME OFF
            {/* <img className = "laid_back" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA7J4UCmxeP-lg1Qx5I6EGDxQXk2x6xxNTGM3Xw35plmClwxvQGg"/> */}
            <div className="months">
                <p className="current_month">CURRENT MONTH</p>
                <p className="next_month">NEXT MONTH</p>
                <p className="two_months_out">TWO MONTHS OUT</p>
            </div>
            </div>
            </body>
        )
    }
}
export default Home