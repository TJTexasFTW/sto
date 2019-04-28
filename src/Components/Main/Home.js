import React, {Component} from 'react';
// import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import './Home.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirect: false,
            thisMonth: [],
            list: ''
        }
    }

    componentDidMount() {
        axios.get('/api/currentMonth')
        .then(results => {this.setState({ thisMonth: results.data });
      }).catch( error => alert(error))
        console.log("processed compDidMount:", this.state.thisMonth.length)  
    }

      componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
          this.setState({ thisMonth: {} });
        }
      }
    

    render() {

let info = this.state.thisMonth;

    function makeList(info) {
        
        for (let i = 0; i < info.length; i++) {
            switch(info.from_table) {
                case 'BLOCKED': 
                    info = info +  
                    <p>{info.start_date} RESTRICTED</p>;
                    console.log("***We are in the makeList switch statement***");
                    break;
                default: 
                  this.setState({list: "no data"})
                }
            } 
        }

        return(
            <div className="Home">
                <h1 className = 'appHeading'>SCHEDULED TIME OFF</h1>
                <div className="months">
                    <div className="current_month">CURRENT MONTH
                        <ul>
                            {this.state.list}
                        </ul> 
                    </div>
                    <div className="next_month">NEXT MONTH</div>
                    <div className="two_months_out">TWO MONTHS OUT</div>
                </div>
                <button>ADD/UPDATE STO</button>
                <button>ADMIN MENU</button>
            </div>
        )
    }
}
export default Home