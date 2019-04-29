import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import './Home.css';
import {connect} from 'react-redux';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirect: false,
            thisMonth: [{}],
            nextMonth: [{}],
            nextPlusOneMonth: [{}],
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
console.log("This should be info from database: ", info);
let dateEntry = [];

        
        for (let i = 0; i < info.length; i++) {
            switch(info[i].from_table) {
                case 'BLOCKED': 
                    dateEntry.push(  
                    <p>{info[i].start_date.substring(5,10)} RESTRICTED</p>);
                    console.log("***We are in the makeList switch statement***");
                    break;
                case 'STO': 
                    dateEntry.push(  
                    <p>{info[i].start_date.substring(5,10)} {info[i].initials}</p>);
                    console.log("***We are in the makeList switch statement***");
                    break;
                case 'EVENT':
                    dateEntry.push(  
                    <p>{info[i].start_date.substring(5,10)} {info[i].initials}</p>);
                    console.log("***We are in the makeList switch statement***");
                    break;
                default: 
                  console.log("Home Component - issue in render area");
                }
        }
    
        // makeList(info);

        return(
            <div className="Home">
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <div className="months">
                    <div className="current_month"><u>CURRENT MONTH</u>
                        <ul>
                            {dateEntry}
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
const mapStateToProps = state => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(Home);