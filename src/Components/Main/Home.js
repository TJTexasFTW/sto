import React, {Component} from 'react';
import {Link} from 'react-router-dom'
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
            twoMonthsOut: [{}],
            list: ''
        }

    }

    componentDidMount() {
        axios.get('/api/currentMonth')
        .then(results => {this.setState({ thisMonth: results.data });
      }).catch( error => alert(error));
        // console.log("processed compDidMount:", this.state.thisMonth); 

        axios.get('/api/nextMonth')
        .then(results => {this.setState({ nextMonth: results.data });
      }).catch( error => alert(error));
        // console.log("processed compDidMount nextMonth:", this.state.nextMonth);

        axios.get('/api/twoMonthsOut')
        .then(results => {this.setState({ twoMonthsOut: results.data });
      }).catch( error => alert(error));
        // console.log("processed compDidMount twoMonthsOut:", this.state.twoMonthsOut);
    }

    //   componentDidUpdate(prevProps) {
    //     if (prevProps !== this.props) {
    //       this.setState({ thisMonth: {} });
    //     }
    //   }
    
    render() {

let info = this.state.thisMonth;
// console.log("This should be info from database: ", info);
let dateEntry = [];
        
        for (let i = 0; i < info.length; i++) {

            switch(info[i].from_table) {
                case 'BLOCKED': 
                if (String(info[i].start_date.substring(5,5)) === 0) {
                    var start = info[i].start_date.substring(6,10);
                    // console.log("Trying to get rid of leading zero");
                } else {
                    start = info[i].start_date.substring(5,10)
                }
                dateEntry.push(  
                    <p>{start} RESTRICTED</p>);
                    // console.log("***We are in the makeList switch statement***");
                    break;
                case 'STO': 

                    if (String(info[i].start_date.substring(5,5)) === 0) {
                        start = info[i].start_date.substring(6,10);
                        // console.log("Trying to get rid of leading zero");
                    } else {
                        start = info[i].start_date.substring(5,10)
                    }

                    if (String(info[i].end_date.substring(5,5)) === 0) {
                        var end = info[i].end_date.substring(6,10);
                        // console.log("Trying to get rid of leading zero");
                    } else {
                        end = info[i].end_date.substring(5,10)
                    }
                    //check if start and end date match
                    if (info[i].start_date === info[i].end_date) {
                    dateEntry.push(  
                    <p>{start} {info[i].initials}</p>);
                    } else {
                        //end date is different - concantenate start & end
                        dateEntry.push(  
                            <p>{start} thru {end} {info[i].initials}</p>);
                    }
                    // console.log("***We are in the makeList switch statement***");
                    break;
                case 'EVENT':

                if (String(info[i].start_date.substring(5,5)) === 0) {
                    start = info[i].start_date.substring(6,10);
                    // console.log("Trying to get rid of leading zero");
                } else {
                    start = info[i].start_date.substring(5,10)
                }

                dateEntry.push(  
                    <p>{start} {info[i].initials}</p>);
                    // console.log("***We are in the makeList switch statement***");
                    break;
                default: 
                  console.log("Home Component - issue in render area");
                }
        }
    
        let infoNext = this.state.nextMonth;
        // console.log("This should be info from database: ", info);
        let dateEntryNext = [];
                
                for (let i = 0; i < infoNext.length; i++) {
        
                    switch(infoNext[i].from_table) {
                        case 'BLOCKED': 
                        if (String(infoNext[i].start_date.substring(5,5)) === 0) {
                            start = infoNext[i].start_date.substring(6,10);
                            // console.log("Trying to get rid of leading zero");
                        } else {
                            start = infoNext[i].start_date.substring(5,10)
                        }
                        dateEntryNext.push(  
                            <p>{start} RESTRICTED</p>);
                            // console.log("***We are in the makeList switch statement***");
                            break;
                        case 'STO': 
        
                            if (String(infoNext[i].start_date.substring(5,5)) === 0) {
                                start = infoNext[i].start_date.substring(6,10);
                                // console.log("Trying to get rid of leading zero");
                            } else {
                                start = infoNext[i].start_date.substring(5,10)
                            }
        
                            if (String(infoNext[i].end_date.substring(5,5)) === 0) {
                                end = infoNext[i].end_date.substring(6,10);
                                // console.log("Trying to get rid of leading zero");
                            } else {
                                end = infoNext[i].end_date.substring(5,10)
                            }
                            //check if start and end date match
                            if (infoNext[i].start_date === infoNext[i].end_date) {
                            dateEntryNext.push(  
                            <p>{start} {infoNext[i].initials}</p>);
                            } else {
                                //end date is different - concantenate start & end
                                dateEntryNext.push(  
                                    <p>{start} thru {end} {infoNext[i].initials}</p>);
                            }
                            break;
                        case 'EVENT':
        
                        if (String(infoNext[i].start_date.substring(5,5)) === 0) {
                            start = infoNext[i].start_date.substring(6,10);
                            // console.log("Trying to get rid of leading zero");
                        } else {
                            start = infoNext[i].start_date.substring(5,10)
                        }
        
                        dateEntryNext.push(  
                            <p>{start} {infoNext[i].initials}</p>);
                            // console.log("***We are in the makeList switch statement***");
                            break;
                        default: 
                        //   console.log("Home Component - issue in render area");
                        }
                }

        let infoTwoMonthsOut = this.state.twoMonthsOut;
        // console.log("This should be info from database: ", info);
        let dateEntryTwoMonthsOut = [];
                
                for (let i = 0; i < infoTwoMonthsOut.length; i++) {
        
                    switch(infoTwoMonthsOut[i].from_table) {
                        case 'BLOCKED': 
                        if (String(infoTwoMonthsOut[i].start_date.substring(5,5)) === 0) {
                            start = infoTwoMonthsOut[i].start_date.substring(6,10);
                            // console.log("Trying to get rid of leading zero");
                        } else {
                            start = infoTwoMonthsOut[i].start_date.substring(5,10)
                        }
                        dateEntryTwoMonthsOut.push(  
                            <p>{start} RESTRICTED</p>);
                            // console.log("***We are in the makeList switch statement***");
                            break;
                        case 'STO': 
        
                            if (String(infoTwoMonthsOut[i].start_date.substring(5,5)) === 0) {
                                start = infoTwoMonthsOut[i].start_date.substring(6,10);
                                // console.log("Trying to get rid of leading zero");
                            } else {
                                start = infoTwoMonthsOut[i].start_date.substring(5,10)
                            }
        
                            if (String(infoTwoMonthsOut[i].end_date.substring(5,5)) === 0) {
                                end = infoTwoMonthsOut[i].end_date.substring(6,10);
                                // console.log("Trying to get rid of leading zero");
                            } else {
                                end = infoTwoMonthsOut[i].end_date.substring(5,10)
                            }
                            //check if start and end date match
                            if (infoTwoMonthsOut[i].start_date === infoTwoMonthsOut[i].end_date) {
                            dateEntryTwoMonthsOut.push(  
                            <p>{start} {infoTwoMonthsOut[i].initials}</p>);
                            } else {
                                //end date is different - concantenate start & end
                                dateEntryTwoMonthsOut.push(  
                                    <p>{start} thru {end} {infoTwoMonthsOut[i].initials}</p>);
                            }
                            break;
                        case 'EVENT':
        
                        if (String(infoTwoMonthsOut[i].start_date.substring(5,5)) === 0) {
                            start = infoTwoMonthsOut[i].start_date.substring(6,10);
                            // console.log("Trying to get rid of leading zero");
                        } else {
                            start = infoTwoMonthsOut[i].start_date.substring(5,10)
                        }
        
                        dateEntryTwoMonthsOut.push(  
                            <p>{start} {infoTwoMonthsOut[i].initials}</p>);
                            // console.log("***We are in the makeList switch statement***");
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
                        <ul className='sto_listing'>
                            {dateEntry}
                        </ul> 
                    </div>
                    <div className="next_month"><u>NEXT MONTH</u>
                    <ul className='sto_listing'>
                            {dateEntryNext}
                        </ul> 
                    </div>
                    
                    <div className="two_months_out"><u>TWO MONTHS OUT</u>
                    <ul className='sto_listing'>
                            {dateEntryTwoMonthsOut}
                        </ul>                     
                    </div>
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