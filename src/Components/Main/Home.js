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
            redirect: false,
            thisMonth: []
        }


    }

    componentDidMount() {
        axios.get('/api/currentMonth')
        .then(results =>{this.setState({ thisMonth: results.data });
      }).catch( error => alert(error))
      }



    render() {

        const thisMonthList = this.state.thisMonth.map((thisMonth, i) => ( 
            <div>
                <p>thisMonth.</p>
                {/* <h3>NAME: { houses.name } </h3>
                <p>{houses.address}</p> 
                <p>{houses.city} </p>
                <p>{houses.state}</p> 
                <p>{houses.zipcode}</p> */}
            </div>   
      ));

        return(
            // <body>
            <div className="Home">
                <h1 className = 'appHeading'>SCHEDULED TIME OFF</h1>
            {/* <img className = "laid_back" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA7J4UCmxeP-lg1Qx5I6EGDxQXk2x6xxNTGM3Xw35plmClwxvQGg"/> */}
            <div className="months">
                <div className="current_month">CURRENT MONTH
                    <ul>
                        <li className="current_month_list">JW 5/1</li> 
                    </ul> 
                </div>
                <div className="next_month">NEXT MONTH</div>
                <div className="two_months_out">TWO MONTHS OUT</div>
            </div>
            </div>
            // </body>
        )
    }
}
export default Home