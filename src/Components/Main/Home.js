import React, {Component} from 'react';
import axios from 'axios';
import './Home.css';
import {connect} from 'react-redux';
import '../../App_SASS.scss'
import flamingo from "../../images/mohamed-ajufaan-678502-unsplash.jpg";

// import './vicko-mozara-324955-unsplash.jpg'


class Home extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirect: false,
            thisMonth: [{}],
            nextMonth: [{}],
            twoMonthsOut: [{}],
            list: '',
            menuRequest: ''
        }

        this.handleAdminClick = this.handleAdminClick.bind( this ); 
        this.handleSTOClick = this.handleSTOClick.bind( this ); 
        this.handleLogoffClick = this.handleLogoffClick.bind(this);

    }

    componentDidMount() {
    axios.get('/api/currentMonth')
        .then(results => {this.setState({ thisMonth: results.data });
      }).catch( error => alert(error));

    axios.get('/api/nextMonth')
        .then(results => {this.setState({ nextMonth: results.data });
      }).catch( error => alert(error));

    axios.get('/api/twoMonthsOut')
        .then(results => {this.setState({ twoMonthsOut: results.data });
      }).catch( error => alert(error));

      if(!this.props.loginUser.user.id) {
        this.setState({redirect: true});
    }

    }

    handleLogoffClick() {
        //user has requested logoff
        //clear session and loginUser.user object
        axios.get('/api/logoff')
            .then(results => {this.setState({ username: '' });
        }).catch( error => alert("No user was logged in . . .", error))

        this.props.history.push('/')

        document.location.reload()
    }

    handleAdminClick() {
    if (typeof this.props.loginUser.user.id === 'undefined') {
        //no user logged in
        this.props.history.push('/login')
        this.setState({ menuRequest: 'admin'})
        this.setState({redirect: true})
    } else {
        //check if user is an admin
        if (this.props.loginUser.user.admin === false) {
            alert("You are not authorized as an admin");
        } else {
            this.props.history.push('/admin_menu')
        }
    }
}

handleSTOClick() {
    if (typeof this.props.loginUser.user.id === 'undefined') {
        this.props.history.push('/login')
    } else {
        //send to login screen
        this.props.history.push('/scheduled_time_off_adds')
    }
}

    render() {

        // console.log("Render what props:", this.props)

        
        function prepareDateList(array) {
            // console.log(array);
            // array is from state for date column being processed
            // dateList will be the dates after processing
            // for formatting depending on if STO, event or blocked
            var styles = {
                color: 'blue',
                fontWeight: 'lighter',
                // fontSize: '1.7vw',
                fontStyle: 'italic'
            }

            var styles2 = {
                color: 'green',
                fontWeight: 'lighter',
                // fontSize: '1.7vw',
                fontStyle: 'italic'
            }

            let info = [...array]; 
            let dateList = [];
            let start = '';
            let end = '';
                    
            for (let i = 0; i < info.length; i++) {
                switch(info[i].from_table) {
                    case 'BLOCKED': 
                        if (String(info[i].start_date.substring(5,5)) === 0) {
                                start = info[i].start_date.substring(6,10);
                            } else {
                                start = info[i].start_date.substring(5,10)
                            }
                                dateList.push(  
                                    // <p style={{ color: 'red'}}>{start} Restricted</p>);
                                    <p style={styles}>{start} Restricted</p>);
                                    break;
        
                    case 'STO': 
                        if (String(info[i].start_date.substring(5,5)) === 0) {
                                start = info[i].start_date.substring(6,10);
                            } else {
                                start = info[i].start_date.substring(5,10)
                            }
        
                        if (String(info[i].end_date.substring(5,5)) === 0) {
                                end = info[i].end_date.substring(6,10);
                            } else {
                                end = info[i].end_date.substring(5,10)
                            }
                            
                        //check if start and end date match
                        if (info[i].start_date === info[i].end_date) {
                                dateList.push(  
                                    <p>{start} {info[i].initials}</p>);
                            } else {
                              //end date is different - concantenate start & end
                                dateList.push(  
                                    <p>{start} - {end} {info[i].initials}</p>);
                            }
                                break;
        
                    case 'EVENT':
                        if (String(info[i].start_date.substring(5,5)) === 0) {
                                start = info[i].start_date.substring(6,10);
                            } else {
                                start = info[i].start_date.substring(5,10)
                            }
                                dateList.push(  
                                    <p style={styles2}>{start} {info[i].initials}</p>);
                                    break;
                        default: 
                            console.log("There was an issue in the prepareDateList function.")
                        }
                    
                }
                return dateList;
            }

            let dateList0 = prepareDateList(this.state.thisMonth);
            let dateList1 = prepareDateList(this.state.nextMonth);
            let dateList2 = prepareDateList(this.state.twoMonthsOut);
            
            return(
                <div className="Home">
                    <div className = 'pink'>
                        <img src={flamingo} alt="Palm Trees on Beach" className="dock" id='pinkFlamingo'/>
                    </div>
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <div className="months">
                    <div className="current_month" id="current_month"><u>CURRENT MONTH</u>
                        <ul className='sto_listing'>
                            {dateList0}
                        </ul> 
                    </div>
                    <div className="next_month" id='next_month'><u>NEXT MONTH</u>
                    <ul className='sto_listing'>
                            {dateList1}
                        </ul> 
                    </div>
                    
                    <div className="two_months_out" id='two_months_out'><u>TWO MONTHS OUT</u>
                    <ul className='sto_listing'>
                            {dateList2}
                        </ul>                     
                    </div>
                </div>
                        <p id='photo_credit'>Photo by Mohamed Ajufaan on Unsplash</p>
                <p className = "restrictedNotice">Time off for Restricted dates requires Senior Management Approval.</p>
                <div className="button_choices">
                    <button className = "adminButton" onClick={this.handleLogoffClick}>LOG OFF</button>
                    <button className = "adminButton" id="admin" onClick = {this.handleAdminClick}>ADMIN MENU</button>
                    <button className="addButton" id="STO" onClick = {this.handleSTOClick}>ADD/UPDATE STO</button>
                    {/* <button className = 'adminButton' id="login">LOG IN</button> */}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Home);