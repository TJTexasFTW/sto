import React, {Component} from 'react';
// import {Link} from 'react-router-dom'
import axios from 'axios';
import './Home.css';
import {connect} from 'react-redux';
// import {loginUser} from '../../Redux/reducer';  

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
            // name: this.props.loginUser.user.name
        }

        this.handleAdminClick = this.handleAdminClick.bind( this ); 
        this.handleSTOClick = this.handleSTOClick.bind( this ); 

    }

    componentDidMount() {

        // console.log("Home props: ", this.props);
        // console.log("req.session.user: ", req.session.user)

        // document.getElementById('userMsg').innerHTML = `Hello ${this.props.loginUser.user.username}`;

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

    //   componentDidUpdate(prevProps) {
    //     if (prevProps !== this.props) {
    //       this.setState({ thisMonth: {} });
    //     }
    //   }
    
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
    // if (req.session.loginUser.length > 0) {
    // if (this.name.length = '') {
        //user is already logged in - send to STO add screen
        console.log("handleSTOClicl first branch of if")
        this.props.history.push('/login')
        // return <Redirect to='/scheduled_time_off_adds'/>
    } else {
        //send to login screen
        
        this.props.history.push('/scheduled_time_off_adds')
        // return <Redirect to='/login'/>
    }
    // document.getElementById('userMsg').innerHTML = `Hello ${this.props.loginUser.user.name}`;
}



    render() {

        console.log("Render what props:", this.props)

        function prepareDateList(array) {
            console.log(array);
            // array is from state for date column being processed
            // dateList will be the dates after processing
            // for formatting depending on if STO, event or blocked
            let info = [...array]; 
            let dateList = [];
            let start = '';
            let end = '';
                    
            for (let i = 0; i < info.length; i++) {
                // console.log("value of i: ", i)
                switch(info[i].from_table) {
                    case 'BLOCKED': 
                        if (String(info[i].start_date.substring(5,5)) === 0) {
                                start = info[i].start_date.substring(6,10);
                            } else {
                                start = info[i].start_date.substring(5,10)
                            }
                                dateList.push(  
                                    <p>{start} RESTRICTED</p>);
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
                                    <p>{start} thru {end} {info[i].initials}</p>);
                            }
                                break;
        
                    case 'EVENT':
                        if (String(info[i].start_date.substring(5,5)) === 0) {
                                start = info[i].start_date.substring(6,10);
                            } else {
                                start = info[i].start_date.substring(5,10)
                            }
                                dateList.push(  
                                    <p>{start} {info[i].initials}</p>);
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
                <h1 className = 'appHeading'>SCHEDULED TIME OFF (STO)</h1>
                <div className="months">
                    <div className="current_month"><u>CURRENT MONTH</u>
                        <ul className='sto_listing'>
                            {dateList0}
                        </ul> 
                    </div>
                    <div className="next_month"><u>NEXT MONTH</u>
                    <ul className='sto_listing'>
                            {dateList1}
                        </ul> 
                    </div>
                    
                    <div className="two_months_out"><u>TWO MONTHS OUT</u>
                    <ul className='sto_listing'>
                            {dateList2}
                        </ul>                     
                    </div>
                </div>
                <p className = "restrictedNotice">Time off for RESTRICTED dates requires Senior Management Approval.</p>
                <div className="button_choices">
                    {/* <Link to='/admin_menu'><button className = "adminButton">ADMIN MENU</button></Link> */}
                    <button id="logoff" className = "adminButton" >LOG OFF</button>
                    <button className = "adminButton" id="admin" onClick = {this.handleAdminClick}>ADMIN MENU</button>
                    <button className="addButton" id="STO" onClick = {this.handleSTOClick}>ADD/UPDATE STO</button>
                    <button className = 'adminButton' id="login">LOG IN</button>
                    {/* <Link to='/login'><button className="addButton">ADD/UPDATE STO</button></Link> */}
                    
                </div>
                <p>User Msg Below This</p>
                <p id="userMsg"></p>
                <p>Props: {this.props.loginUser.user.id}</p>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Home);