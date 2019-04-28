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
            thisMonth: [{}],
            list: ''
        }
    }

    componentDidMount() {
        axios.get('/api/currentMonth')
        .then(results => {this.setState({ thisMonth: results.data });
      }).catch( error => alert(error));
        console.log("processed compDidMount:", this.state.thisMonth)  
    }

    //   componentDidUpdate(prevProps) {
    //     if (prevProps !== this.props) {
    //       this.setState({ thisMonth: {} });
    //     }
    //   }
    
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
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <div className="months">
                    <div className="current_month"><u>CURRENT MONTH</u>
                        <ul>
                            {this.state.list}
                        </ul> 
                    </div>
                    <div className="next_month"><u>NEXT MONTH</u>
                       <div className='data'>
                            <p className='date_info'>Dummy Data</p>
                       </div> 
                    </div>
                    
                    <div className="two_months_out"><u>IN 3 MONTHS</u></div>
                </div>
                <p className = "restrictedNotice">Time off for RESTRICTED dates requires Senior Management Approval.</p>
                <div className="button_choices">
                    <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link>
                    <Link to='/login'><button className="addButton">ADD/UPDATE STO</button></Link>
                    
                </div>
            </div>
        )
    }
}
export default Home